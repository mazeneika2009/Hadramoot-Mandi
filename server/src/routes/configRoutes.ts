import { Router } from 'express';
import { configController } from '../controllers/configController';

export const configRoutes = Router();

configRoutes.get('/', configController.get);
