import express from 'express';
import { defaultCommonPageData } from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { commonUrlPath } from 'jsc-k3s-dashboard-common/src/models/routes';
import { sendResponse } from './response';

export const commonRoute = express.Router();

commonRoute.get(commonUrlPath, (req, res) => {
  sendResponse(res, defaultCommonPageData);
});
