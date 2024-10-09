import express from 'express';
import { K3sPod } from 'jsc-k3s-dashboard-common/src/models/kube/k3spod';
import { getPodsDataByNodeName } from '../services/pods/PodDataService';
import { sendResponse } from './response';

export const podRoute = express.Router();

podRoute.get('/api/pages/pods/:nodename', async (req, res) => {
  const nodes: K3sPod[] = await getPodsDataByNodeName(req.params.nodename);
  sendResponse(res, nodes);
});
