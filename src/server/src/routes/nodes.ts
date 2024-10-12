import express from 'express';
import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { nodesUrlPath } from 'jsc-k3s-dashboard-common/src/models/routes';
import { getNodesData } from '../services/nodes/NodeDataService';
import { sendResponse } from './response';

export const nodeRoute = express.Router();

nodeRoute.get(nodesUrlPath, async (req, res) => {
  const nodes: K3sNode[] = await getNodesData();
  sendResponse(res, nodes);
});
