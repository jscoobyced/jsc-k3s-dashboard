import express from 'express';
import { errorRoute } from './routes/error';
import { homeRoute } from './routes/home';

// Create Express app
export const app = express();

// Bind routes
app.use('/', homeRoute);
app.use('/error', errorRoute);

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
