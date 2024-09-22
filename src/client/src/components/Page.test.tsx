import { render, screen } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  it('renders a page', () => {
    render(
      <Page
        title="Test Page"
        articleContentElement={<div>Test Content</div>}
        bgColor="bg-black"
      />,
    );
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Content').parentElement).toHaveClass(
      'bg-black',
    );
  });
});
