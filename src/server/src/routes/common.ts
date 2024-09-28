import express from 'express';
import { defaultCommonPageData } from 'jsc-k3s-dashboard-common/src/models/pages/home';
import { sendResponse } from './response';

export const commonRoute = express.Router();

commonRoute.get('/api/pages/common', (req, res) => {
  sendResponse(res, defaultCommonPageData);
});