import express from 'express';
import path from 'path';

export const errorRoute = express.Router();

// Create homepage route
errorRoute.get('/', (req, res) => {
  // Send 'error.html' file
  try {
    res.sendFile('error.html', { root: path.join(__dirname, '../') });
  } catch (error) {
    // Display a generic error text
    res.send('An unexpected error occurred. Please try again later.');
  }
});
