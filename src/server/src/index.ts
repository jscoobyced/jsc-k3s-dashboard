import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getFromProcess } from 'jsc-k3s-dashboard-common/src/services/process';
import { commonRoute } from './routes/common';
import { homeRoute } from './routes/home';
import { nodeRoute } from './routes/nodes';
import { podRoute } from './routes/pods';

// Get environent variables
dotenv.config();
const domain = getFromProcess('DOMAIN', 'localhost');
const port = getFromProcess('PORT', '');
const scheme = getFromProcess('SCHEME', 'http');
const serverUrl = `${scheme}://${domain}${port}`;

// Create Express app
export const app = express();
var corsOptions = {
  origin: serverUrl,
};
app.use(cors(corsOptions));

// Bind routes
app.use('/', homeRoute);
app.use('/', commonRoute);
app.use('/', nodeRoute);
app.use('/', podRoute);

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
