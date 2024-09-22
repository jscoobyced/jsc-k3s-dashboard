import React from 'react';
import { K3sNode } from '../../models/nodes/k3snode';
import {
  readableCpuMetric,
  readableMemoryMetric,
  readablizeBytes,
} from '../../services/format';

const getNodesTable = (nodes: K3sNode[]): React.JSX.Element[] => {
  if (nodes.length === 0) return [];
  const nodeRows: React.JSX.Element[] = [];
  const allNodes = nodes.sort((a, b) => (a.nodeName > b.nodeName ? 1 : -1));
  for (const item of allNodes) {
    const row = (
      <tr key={'node-' + item.nodeName}>
        <td>
          <a className="text-primary-link" href={'/node/' + item.nodeName}>
            {item.nodeName}
          </a>
        </td>
        <td>{item.capacity.cpu}</td>
        <td>{readablizeBytes(item.capacity.memory)}</td>
        <td>{readablizeBytes(item.capacity.storage)}</td>
        <td>{item.capacity.pods}</td>
        <td>{item.allocatable.cpu}</td>
        <td>{readablizeBytes(item.allocatable.memory)}</td>
        <td>{readablizeBytes(item.allocatable.storage)}</td>
        <td>{item.allocatable.pods}</td>
        <td>{readableCpuMetric(item.metrics.usage.cpu)}</td>
        <td>{readableMemoryMetric(item.metrics.usage.memory)}</td>
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
