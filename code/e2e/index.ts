import express from 'express';
import fs from 'fs';
import https from 'https';
import http from 'http';

const privateKey  = fs.readFileSync('data/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('data/selfsigned.crt', 'utf8');

const app = express();
const credentials = {key: privateKey, cert: certificate};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const port = 6443;

const nodes = fs.readFileSync('data/nodes.json', 'utf-8');
const jsonNodes = JSON.parse(nodes);

app.get('/api/v1/nodes', (req, res) => {
  res.json(jsonNodes);
});

httpServer.listen(6000);
httpsServer.listen(6443);