import express from 'express';
import { defaultK3sNode } from '../../../common/src/models/kube/defaults';
import { K3sNode } from '../../../common/src/models/kube/k3snode';
import { sendResponse } from './response';

export const homeRoute = express.Router();

homeRoute.get('/api/pages/nodes', (req, res) => {
  const nodes: K3sNode[] = [defaultK3sNode];
  sendResponse(res, nodes);
});
