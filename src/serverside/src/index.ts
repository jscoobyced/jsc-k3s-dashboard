import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorRoute } from './routes/error';
import { homeRoute } from './routes/home';

// Get environent variables
dotenv.config();
const domain = process.env.DOMAIN
  ? `https://${process.env.DOMAIN}`
  : 'http://localhost:3000';

// Create Express app
export const app = express();
var corsOptions = {
  origin: domain,
};
app.use(cors(corsOptions));

// Bind routes
app.use('/', homeRoute);
app.use('/error', errorRoute);

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
