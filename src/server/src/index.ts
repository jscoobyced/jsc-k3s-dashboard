import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { commonRoute } from './routes/common';
import { homeRoute } from './routes/home';
import { nodeRoute } from './routes/nodes';

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
app.use('/', commonRoute);
app.use('/', nodeRoute);

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
