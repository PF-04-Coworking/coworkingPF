import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Ejecutando metodo ${req.method} en la ruta ${req.originalUrl}`,
    );
    next();
  }
}

export function LoggerGlobalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `Ejecutando ruta ${req.originalUrl} con el metodo ${req.method} con la fecha - hora actual ${new Date()}`,
  );
  next();
}
