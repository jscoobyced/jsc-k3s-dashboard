import { describe, expect, it, jest } from '@jest/globals';
import express from 'express';
import { sendResponse } from './response';

describe('sendResponse', () => {
  it('should handle error and send custom error message when res.json throws', () => {
    const res = {
      json: jest.fn().mockImplementationOnce(() => {
        throw new Error('Test error');
      }),
    } as unknown as express.Response;

    sendResponse(res, {});

    expect(res.json).toHaveBeenCalledTimes(2);
    expect(res.json).toHaveBeenCalledWith({
      error:
        'An unexpected error occurred. Please try again later. Error: Test error',
    });
  });
});
