import express from 'express';
import {
  defaultCommonPageData,
  defaultHomePageData,
} from '../models/pages/home';

export const homeRoute = express.Router();

// Create homepage route
homeRoute.get('/api/pages/common', (req, res) => {
  sendResponse(res, defaultCommonPageData);
});

homeRoute.get('/api/pages/home', (req, res) => {
  sendResponse(res, defaultHomePageData);
});

const sendResponse = (res: express.Response, data: any) => {
  try {
    res.json(data);
  } catch (error) {
    res.json({
      error: 'An unexpected error occurred. Please try again later.',
    });
  }
};
