import { describe, expect, it } from '@jest/globals';
import express from 'express';
import { defaultHomePageData } from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { homeUrlPath } from 'jsc-k3s-dashboard-common/src/models/routes';
import request from 'supertest';
import { homeRoute } from './home';

const app = express();
app.use(homeRoute);

describe('homeRoute', () => {
  it('should send the defaultHomePageData when calling /api/pages/home', async () => {
    // Not sure why this is needed, but it is
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const response = await request(app).get(homeUrlPath);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(defaultHomePageData);
  });
});
