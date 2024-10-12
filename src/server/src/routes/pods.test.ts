import { describe, expect, it, jest } from '@jest/globals';
import express from 'express';
import { defaultK3sPod } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { podsUrlPath } from 'jsc-k3s-dashboard-common/src/models/routes';
import request from 'supertest';
import * as getPodsDataByNodeName from '../services/pods/PodDataService';
import { podRoute } from './pods';

const app = express();
app.use(podRoute);

describe('podsRoute', () => {
  it('should send the defaultK3sPod when calling /api/pages/nodes', async () => {
    jest
      .spyOn(getPodsDataByNodeName, 'getPodsDataByNodeName')
      .mockResolvedValue([defaultK3sPod]);

    // Not sure why this is needed, but it is
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const response = await request(app).get(`${podsUrlPath}/test`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([defaultK3sPod]);
  });
});
