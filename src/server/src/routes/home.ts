import express from 'express';
import { defaultHomePageData } from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { homeUrlPath } from 'jsc-k3s-dashboard-common/src/models/routes';
import { sendResponse } from './response';

export const homeRoute = express.Router();

homeRoute.get(homeUrlPath, (req, res) => {
  sendResponse(res, defaultHomePageData);
});
