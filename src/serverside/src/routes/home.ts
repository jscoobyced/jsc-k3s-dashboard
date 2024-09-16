import express from 'express';

export const homeRoute = express.Router();

// Create homepage route
homeRoute.get('/api/pages/common', (req, res) => {
  // Send 'index.html' file
  try {
    const commonPageData = {
      siteName: 'localhost',
      year: 2024,
      version: '1.0.0',
    };
    res.json(commonPageData);
  } catch (error) {
    // Redirect to 'error.html' page
    res.redirect('/error');
  }
});
