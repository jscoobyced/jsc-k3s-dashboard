import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockNode } from '../../__tests__/models';
import NodeList from './NodeList';

describe('NodeList', () => {
  it('should render an empty table when list of node is empty', () => {
    render(
      <MemoryRouter>
        <NodeList nodes={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Nodes list')).toBeInTheDocument();
    expect(screen.queryAllByRole('row')).toHaveLength(2);
  });

  it('should render a table with the node list', () => {
    render(
      <MemoryRouter>
        <NodeList nodes={[mockNode]} />
      </MemoryRouter>,
    );

    expect(screen.queryAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('node1')).toBeInTheDocument();
    expect(screen.getByText('node1')).toHaveAttribute('href', '/node/node1');

    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1.00m')).toBeInTheDocument();
    expect(screen.getByText('500.00Mi')).toBeInTheDocument();

    expect(screen.getByText('110')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
