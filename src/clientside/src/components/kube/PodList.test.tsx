import { render, screen } from '@testing-library/react';
import { mockPod } from '../../__tests__/models';
import PodList from './PodList';

describe('PodList', () => {
  it('should render an empty table when list of pod is empty', () => {
    render(<PodList pods={[]} />);

    expect(screen.getByText('Pods list')).toBeInTheDocument();
    expect(screen.queryAllByRole('row')).toHaveLength(1);
  });

  it('should render a table with the pod list', () => {
    render(<PodList pods={[mockPod]} />);

    expect(screen.queryAllByRole('row')).toHaveLength(2);
    expect(screen.getByText('node1')).toBeInTheDocument();
    expect(screen.getByText('pod1')).toBeInTheDocument();
    expect(screen.getByText('nginx:latest')).toBeInTheDocument();
    expect(screen.getByText('frontend')).toBeInTheDocument();
    expect(screen.getByText('2021-06-01T10:00:00Z')).toBeInTheDocument();
  });

  it('should render a table with multiple pods', () => {
    const mockPod2 = {
      ...mockPod,
      metadata: {
        ...mockPod.metadata,
        name: 'pod5',
        labels: { app: 'other', tier: 'backend' },
      },
      spec: {
        ...mockPod.spec,
        nodeName: 'node2',
        containers: undefined,
      },
      status: {
        ...mockPod.status,
        phase: 'Running',
        startTime: '2021-06-01T11:00:00Z',
      },
    };
    const mockPod3 = {
      ...mockPod,
      metadata: {
        ...mockPod.metadata,
        name: 'pod3',
        labels: { app: 'another', tier: 'database' },
      },
      spec: {
        ...mockPod.spec,
        nodeName: 'node3',
        containers: undefined,
      },
      status: {
        ...mockPod.status,
        phase: 'Running',
        startTime: '2022-06-01T11:00:00Z',
      },
    };
    render(<PodList pods={[mockPod, mockPod2, mockPod3]} />);

    expect(screen.queryAllByRole('row')).toHaveLength(4);
    expect(screen.getByText('node2')).toBeInTheDocument();
    expect(screen.getByText('pod1')).toBeInTheDocument();
    expect(screen.getByText('nginx:latest')).toBeInTheDocument();
    expect(screen.getByText('frontend')).toBeInTheDocument();
    expect(screen.getByText('2021-06-01T10:00:00Z')).toBeInTheDocument();
  });
});
