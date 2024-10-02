import { defaultK3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';

export const getNodesData = async (): Promise<K3sNode[]> => {
  await Promise.resolve();
  const nodes: K3sNode[] = [defaultK3sNode];
  return nodes;
};
