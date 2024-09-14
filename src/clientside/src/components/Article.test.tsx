import { render, screen } from '@testing-library/react';
import Article from './Article';

describe('Article', () => {
  const expected = 'some text';

  it('renders content', () => {
    render(<Article content={<div>{expected}</div>} />);
    expect(screen.getByRole('article')).toHaveTextContent(expected);
  });

  it('renders title', () => {
    render(<Article content={<div></div>} title={expected} />);
    expect(screen.getByRole('article')).toHaveTextContent(expected);
  });

  it('renders alt', () => {
    render(<Article content={<div></div>} alt={expected} />);
    expect(screen.getByRole('article')).toHaveTextContent(expected);
  });

  it('renders image', () => {
    render(<Article content={<div></div>} image={expected} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', expected);
    expect(screen.getByRole('img')).toHaveClass('float-left');
  });

  it('renders right align', () => {
    render(<Article content={<div></div>} image={expected} right={true} />);
    expect(screen.getByRole('img')).toHaveClass('float-right');
  });
});
