import { describe, expect, it } from '@jest/globals';
import express from 'express';
import { defaultCommonPageData } from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { commonUrlPath } from 'jsc-k3s-dashboard-common/src/models/routes';
import request from 'supertest';
import { commonRoute } from './common';

const app = express();
app.use(commonRoute);

describe('commonRoute', () => {
  it('should send the defaultCommonPageData when calling /api/pages/common', async () => {
    // Not sure why this is needed, but it is
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const response = await request(app).get(commonUrlPath);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(defaultCommonPageData);
  });
});
