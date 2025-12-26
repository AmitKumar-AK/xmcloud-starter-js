// --------------------
// Mock all dependencies used by Hero
// --------------------
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default as Hero } from '@/components/hero/Hero';

// Mock Sitecore SDK components
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Text: (props: any) => <span data-testid="text" {...props}>{props.field?.value}</span>,
  useSitecore: () => ({ page: { mode: { isEditing: false } } }),
}));

// Mock class-variance-authority utility
jest.mock('class-variance-authority', () => ({
  cva: () => () => 'hero',
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Play: () => <span data-testid="icon-play">Play</span>,
  Pause: () => <span data-testid="icon-pause">Pause</span>,
}));

// Mock utility function
jest.mock('lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Mock NoDataFallback component
jest.mock('@/utils/NoDataFallback', () => ({
  NoDataFallback: (props: any) => <div data-testid="no-data">{props.componentName}</div>,
}));

// Mock EditableButton component
jest.mock('@/components/button-component/ButtonComponent', () => ({
  EditableButton: (props: any) => <a data-testid="editable-button" href={props.buttonLink?.href}>{props.buttonLink?.text}</a>,
}));

// Mock AnimatedSection component (named export Default)
jest.mock('@/components/animated-section/AnimatedSection.dev', () => ({
  Default: (props: any) => <div data-testid="animated-section">{props.children}</div>,
}));

// Mock Button component
jest.mock('@/components/ui/button', () => ({
  Button: (props: any) => <button {...props}>{props.children}</button>,
}));

// Mock MediaSection component (named export Default)
jest.mock('@/components/media-section/MediaSection.dev', () => ({
  Default: (props: any) => (
    <div data-testid="media-section">{props.video || props.image ? 'media' : 'no-media'}</div>
  ),
}));




// Mock window.matchMedia for Jest environment
beforeAll(() => {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    };
  };
});



describe('Hero', () => {
  const baseFields = {
    titleRequired: { value: 'Hero Title' },
    descriptionOptional: { value: 'Hero Description' },
    linkOptional: { href: '/test', text: 'Test Link' },
    heroVideoOptional1: { value: { href: 'video1.mp4' } },
    heroImageOptional1: null,
    heroVideoOptional2: null,
    heroImageOptional2: null,
    heroVideoOptional3: null,
    heroImageOptional3: null,
    heroVideoOptional4: null,
    heroImageOptional4: null,
  };

  it('renders hero with all fields', () => {
    render(<Hero fields={baseFields} params={{ colorScheme: 'primary', styles: 'custom-style' }} />);
    expect(screen.getByText('Hero Title')).toBeInTheDocument();
    expect(screen.getByText('Hero Description')).toBeInTheDocument();
    expect(screen.getByTestId('editable-button')).toHaveAttribute('href', '/test');
    expect(screen.getAllByTestId('media-section').length).toBe(4);
  });

  it('renders NoDataFallback when fields is not provided', () => {
    render(<Hero fields={undefined} params={{}} />);
    expect(screen.getByTestId('no-data')).toHaveTextContent('Hero');
  });

  it('toggles play/pause button', () => {
    render(<Hero fields={baseFields} params={{ colorScheme: 'primary' }} />);
    const button = screen.getByRole('button', { name: /Pause Ambient Video|Play Ambient/i });
    expect(screen.getByTestId('icon-pause')).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByTestId('icon-play')).toBeInTheDocument();
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> f1d2f69080cdc5dc6e6953a49ab35c2cb0a7e9d2
