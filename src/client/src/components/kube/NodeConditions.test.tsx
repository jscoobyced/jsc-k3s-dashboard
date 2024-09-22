import { render, screen } from '@testing-library/react';
import { mockNode } from '../../__tests__/models';
import NodeConditions from './NodeConditions';

describe('NodeConditions', () => {
  it('should render a table with the node conditions', () => {
    render(<NodeConditions node={mockNode} />);

    expect(screen.getByText('Ready')).toBeInTheDocument();
    expect(screen.getByText('True')).toBeInTheDocument();
    expect(screen.getByText('Kubelet is healthy')).toBeInTheDocument();

    expect(screen.getByText('OutOfDisk')).toBeInTheDocument();
    expect(screen.getByText('False')).toBeInTheDocument();
    expect(
      screen.getByText('Kubelet has enough disk space'),
    ).toBeInTheDocument();
  });
});
