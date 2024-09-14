import express from 'express';
import { INDEX } from './html';

export const homeRoute = express.Router();

// Create homepage route
homeRoute.get('/', (req, res) => {
  // Send 'index.html' file
  try {
    res.sendFile(INDEX, { root: '.' });
  } catch (error) {
    // Redirect to 'error.html' page
    res.redirect('/error');
  }
});
