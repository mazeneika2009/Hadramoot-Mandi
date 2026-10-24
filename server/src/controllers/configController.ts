import type { Request, Response } from 'express';
import { appConfig, brand } from '../../../shared/config';
import { env } from '../config/env';

export const configController = {
  get(_req: Request, res: Response): void {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({
      success: true,
      data: {
        brand,
        config: appConfig,
        payment: {
          enabled: env.fawaterak.enabled,
          methods: ['wallet', 'fawry', 'card'],
        },
      },
    });
  },
};
