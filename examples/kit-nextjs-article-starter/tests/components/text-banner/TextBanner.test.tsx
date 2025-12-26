// --------------------
// Mock all dependencies used by TextBanner
// --------------------
import { Default as TextBannerDefault } from '@/components/text-banner/TextBannerDefault.dev';
import { Default as TextBanner01 } from '@/components/text-banner/TextBanner01.dev';
import { Default as TextBanner02 } from '@/components/text-banner/TextBanner02.dev';

import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock Sitecore SDK
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  useSitecore: () => ({ page: { mode: { isEditing: false } } }),
}));


// Mock TextBanner variants (named export Default for each)
jest.mock('@/components/text-banner/TextBannerDefault.dev', () => ({
  Default: (props: any) => <div data-testid="text-banner-default">Default {props.isPageEditing ? 'editing' : 'view'}</div>,
}));
jest.mock('@/components/text-banner/TextBanner01.dev', () => ({
  Default: (props: any) => <div data-testid="text-banner-01">Variant01 {props.isPageEditing ? 'editing' : 'view'}</div>,
}));
jest.mock('@/components/text-banner/TextBanner02.dev', () => ({
  Default: (props: any) => <div data-testid="text-banner-02">Variant02 {props.isPageEditing ? 'editing' : 'view'}</div>,
}));



describe('TextBanner', () => {
  const mockProps = {
    fields: { text: { value: 'Banner Text' } },
    params: { styles: 'custom-style' },
  };

  it('renders Default variant', () => {
    render(<TextBannerDefault {...mockProps} />);
    expect(screen.getByTestId('text-banner-default')).toHaveTextContent('Default view');
  });

  it('renders TextBanner01 variant', () => {
    render(<TextBanner01 {...mockProps} />);
    expect(screen.getByTestId('text-banner-01')).toHaveTextContent('Variant01 view');
  });

  it('renders TextBanner02 variant', () => {
    render(<TextBanner02 {...mockProps} />);
    expect(screen.getByTestId('text-banner-02')).toHaveTextContent('Variant02 view');
  });
});
