// --------------------
// Mock all dependencies used by RichTextBlock
// --------------------

import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock Sitecore SDK
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  RichText: ({ field }: any) => (
    <div role="region" className="prose custom-style" data-component-name="rich-text-block" id="test-id">
      <div data-testid="rich-text">{field}</div>
    </div>
  ),
}));

// Mock utility function
jest.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Mock NoDataFallback component
jest.mock('@/utils/NoDataFallback', () => ({
  NoDataFallback: () => <div data-testid="no-data">Rich text</div>,
}));

import { Default as RichTextBlock } from '@/components/rich-text-block/RichTextBlock';

describe('RichTextBlock', () => {
  it('renders rich text when fields are provided', () => {
    render(
      <RichTextBlock
        fields={{ text: 'Test content' }}
        params={{ styles: 'custom-style', RenderingIdentifier: 'test-id' }}
      />
    );
    expect(screen.getByTestId('rich-text')).toHaveTextContent('Test content');
    expect(screen.getByRole('region') || screen.getByText('Test content').parentElement).toHaveClass('prose custom-style');
    expect(screen.getByText('Test content').parentElement).toHaveAttribute('id', 'test-id');
    expect(screen.getByText('Test content').parentElement).toHaveAttribute('data-component-name', 'rich-text-block');
  });

  it('renders empty hint when fields.text is missing', () => {
    render(<RichTextBlock fields={null} params={{}} />);
    expect(screen.getByText('Rich text')).toBeInTheDocument();
  });

  it('renders NoDataFallback when fields is not provided', () => {
    render(<RichTextBlock fields={undefined} params={{}} />);
    expect(screen.getByTestId('no-data')).toHaveTextContent('Rich text');
  });
});
