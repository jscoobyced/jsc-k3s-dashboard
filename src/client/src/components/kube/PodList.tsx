import { K3sPod } from 'jsc-k3s-dashboard-common/src/models/kube/k3spod';
import React from 'react';

const getPodsTable = (pods: K3sPod[]): React.JSX.Element[] => {
  if (pods.length === 0) return [];
  const podRows: React.JSX.Element[] = [];
  const allPods = pods.sort((a, b) =>
    a.metadata.name > b.metadata.name ? 1 : -1,
  );
  for (const item of allPods) {
    const row = (
      <tr key={'pod-' + item.metadata.name}>
        <td>{item.metadata.name}</td>
        <td>{item.metadata.labels.app}</td>
        <td>{item.metadata.labels.tier}</td>
        <td>{item.spec.nodeName}</td>
        <td>{item.spec.containers?.[0].name}</td>
        <td>{item.spec.containers?.[0].image.split('@')[0]}</td>
        <td>{item.status.phase}</td>
        <td>{item.status.startTime}</td>
      </tr>
    );
    podRows.push(row);
  }
  return podRows;
};

const PodList = (props: { pods: K3sPod[] }) => {
  const pods = props.pods;

  return (
    <table
      className="dashboard mx-auto mt-5"
      aria-describedby="table-description"
    >
      <caption id="table-description">Pods list</caption>
      <thead>
        <tr>
          <th>Pod Name</th>
          <th>App</th>
          <th>Tier</th>
          <th>Node</th>
          <th>Container</th>
          <th>Image</th>
          <th>Status</th>
          <th>Started</th>
        </tr>
      </thead>
      <tbody>{getPodsTable(pods)}</tbody>
    </table>
  );
};

export default PodList;
