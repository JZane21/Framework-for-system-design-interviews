import morgan from 'morgan';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import logger from './infrastructure/logger/logger';
import { env } from './infrastructure/config/config';
import { routes } from './api/routes/router';
import { limiter } from './api/middlewares/rateLimiter';
import { AppDataSource } from "./infrastructure/config/dataSource";


AppDataSource.initialize().then(() => {
  const app = express();

  //DOTENV config
  dotenv.config();

  const PORT = env.port;

  app.use(express.json());

  // Setup Logger 
  app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } }));

 //setup Limiter
 app.use(limiter);

  app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola Mundo con Express y TypeScript ssssss!');
  });


  routes(app);


  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}).catch((error: any) => console.log(error));
