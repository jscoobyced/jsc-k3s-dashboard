import express from 'express';

export const sendResponse = (res: express.Response, data: unknown) => {
  try {
    res.json(data);
  } catch (error) {
    const errorMessage = error as Error;
    res.json({
      error: `An unexpected error occurred. Please try again later. Error: ${errorMessage.message}`,
    });
  }
};
