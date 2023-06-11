import { NestFactory } from '@nestjs/core';
import { RouteModule } from './route.module';
import {Request, NextFunction, Response } from 'express';

// can create multiple middlewares
function globleMiddlewareOne (req : Request ,res : Response , next : NextFunction){
console.log("this is globle middlewae one" ,)
next()
}




async function bootstrap() {
  const app = await NestFactory.create(RouteModule);
  app.use(globleMiddlewareOne)
  await app.listen(3000);
}
bootstrap();
