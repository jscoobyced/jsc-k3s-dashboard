import { describe, expect, it } from '@jest/globals';
import express from 'express';
import { defaultHomePageData } from 'jsc-k3s-dashboard-common/src/models/pages/home';
import request from 'supertest';
import { homeRoute } from './home';

const app = express();
app.use(homeRoute);

describe('homeRoute', () => {
  it('should send the defaultHomePageData when calling /api/pages/home', async () => {
    const response = await request(app).get('/api/pages/home');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(defaultHomePageData);
  });
});