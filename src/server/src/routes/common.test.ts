import { describe, expect, it } from '@jest/globals';
import express from 'express';
import { defaultCommonPageData } from 'jsc-k3s-dashboard-common/src/models/pages/home';
import request from 'supertest';
import { commonRoute } from './common';

const app = express();
app.use(commonRoute);

describe('commonRoute', () => {
  it('should send the defaultCommonPageData when calling /api/pages/common', async () => {
    const response = await request(app).get('/api/pages/common');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(defaultCommonPageData);
  });
});
