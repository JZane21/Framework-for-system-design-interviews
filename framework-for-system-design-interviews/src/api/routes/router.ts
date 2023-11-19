import express from 'express';

const API: string = "/api";

export const routes = (server: express.Application) => {
  const router = express.Router();
  server.use(API, router);
};