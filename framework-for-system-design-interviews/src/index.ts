import express, { Request, Response } from 'express';
import { AppDataSource } from "./infrastructure/config/dataSource";
import { env } from './infrastructure/config/config';
import morgan from 'morgan';
import dotenv from 'dotenv';
import logger from './infrastructure/logger/logger';
import { routes } from './api/routes/router';


AppDataSource.initialize().then(() => {
  const app = express();

  //DOTENV config
  dotenv.config();

  const PORT = env.port;

  app.use(express.json());

  // Setup Logger 
  app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } }));


  app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola Mundo con Express y TypeScript ssssss!');
  });


  routes(app);


  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}).catch((error: any) => console.log(error));
