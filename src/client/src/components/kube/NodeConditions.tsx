import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import React from 'react';

const getNodesConditionsTable = (node: K3sNode): React.JSX.Element[] => {
  const nodeRows: React.JSX.Element[] = [];
  for (const condition of node.conditions) {
    const row = (
      <tr key={'type-' + condition.type}>
        <td>{condition.type}</td>
        <td>{condition.status}</td>
        <td>{condition.message}</td>
      </tr>
    );
    nodeRows.push(row);
  }
  return nodeRows;
};

const NodeConditions = (props: { node: K3sNode }) => {
  const node = props.node;

  return (
    <table className="dashboard mx-auto">
      <caption>Nodes Conditions</caption>
      <thead>
        <tr>
          <th>Type</th>
          <th>Status</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>{getNodesConditionsTable(node)}</tbody>
    </table>
  );
};

export default NodeConditions;
