import express from 'express';
import { defaultHomePageData } from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { sendResponse } from './response';

export const homeRoute = express.Router();

homeRoute.get('/api/pages/home', (req, res) => {
  sendResponse(res, defaultHomePageData);
});
