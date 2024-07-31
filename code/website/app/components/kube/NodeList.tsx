import Link from 'next/link';
import { Formatter } from '../../../services/format';
import { K3sNode } from '../../models/nodes/k3snode';

const getNodesTable = (nodes: K3sNode[]): JSX.Element[] => {
  const formatter = Formatter();
  const nodeRows: JSX.Element[] = [];
  if (nodes === null) return [];
  const allNodes = nodes.sort((a, b) => (a.nodeName > b.nodeName ? 1 : -1));
  for (const item of allNodes) {
    const row = (
      <tr key={'node-' + item.nodeName}>
        <td>
          <Link className="text-primary-link" href={'/node/' + item.nodeName}>
            {item.nodeName}
          </Link>
        </td>
        <td>{item.capacity.cpu}</td>
        <td>{formatter.readablizeBytes(item.capacity.memory)}</td>
        <td>{formatter.readablizeBytes(item.capacity.storage)}</td>
        <td>{item.capacity.pods}</td>
        <td>{item.allocatable.cpu}</td>
        <td>{formatter.readablizeBytes(item.allocatable.memory)}</td>
        <td>{formatter.readablizeBytes(item.allocatable.storage)}</td>
        <td>{item.allocatable.pods}</td>
        <td>{formatter.readableCpuMetric(item.metrics.usage.cpu)}</td>
        <td>{formatter.readableMemoryMetric(item.metrics.usage.memory)}</td>
      </tr>
    );
    nodeRows.push(row);
  }
  return nodeRows;
};

const NodeList = (props: { nodes: K3sNode[] }) => {
  const nodes = props.nodes;

  return (
    <table className="dashboard mx-auto">
      <caption>Nodes list</caption>
      <thead>
        <tr>
          <th rowSpan={2}>Node Name</th>
          <th colSpan={4}>Capacity</th>
          <th colSpan={4}>Allocatable</th>
          <th colSpan={2}>Usage</th>
        </tr>
        <tr>
          <th>CPU</th>
          <th>Memory</th>
          <th>Storage</th>
          <th>Pods</th>
          <th>CPU</th>
          <th>Memory</th>
          <th>Storage</th>
          <th>Pods</th>
          <th>CPU</th>
          <th>Memory</th>
        </tr>
      </thead>
      <tbody>{getNodesTable(nodes)}</tbody>
    </table>
  );
};

export default NodeList;
