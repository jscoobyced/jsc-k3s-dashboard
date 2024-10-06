import express from 'express';
import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { getNodesData } from '../services/nodes/NodeDataService';
import { sendResponse } from './response';

export const nodeRoute = express.Router();

nodeRoute.get('/api/pages/nodes', async (req, res) => {
  const nodes: K3sNode[] = await getNodesData();
  sendResponse(res, nodes);
});
