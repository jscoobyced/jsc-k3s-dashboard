"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const privateKey = fs_1.default.readFileSync('data/selfsigned.key', 'utf8');
const certificate = fs_1.default.readFileSync('data/selfsigned.crt', 'utf8');
const app = (0, express_1.default)();
const credentials = { key: privateKey, cert: certificate };
const httpServer = http_1.default.createServer(app);
const httpsServer = https_1.default.createServer(credentials, app);
const port = 6443;
const nodes = fs_1.default.readFileSync('data/nodes.json', 'utf-8');
const jsonNodes = JSON.parse(nodes);
app.get('/api/v1/nodes', (req, res) => {
    res.json(jsonNodes);
});
httpServer.listen(6000);
httpsServer.listen(6443);
