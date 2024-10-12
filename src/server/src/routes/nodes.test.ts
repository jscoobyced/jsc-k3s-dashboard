import { describe, expect, it, jest } from '@jest/globals';
import express from 'express';
import { defaultK3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { nodesUrlPath } from 'jsc-k3s-dashboard-common/src/models/routes';
import request from 'supertest';
import * as getNodesData from '../services/nodes/NodeDataService';
import { nodeRoute } from './nodes';

const app = express();
app.use(nodeRoute);

describe('nodeRoute', () => {
  it('should send the defaultK3sNode when calling /api/pages/nodes', async () => {
    jest
      .spyOn(getNodesData, 'getNodesData')
      .mockResolvedValue([defaultK3sNode]);
    // Not sure why this is needed, but it is
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const response = await request(app).get(nodesUrlPath);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([defaultK3sNode]);
  });
});
