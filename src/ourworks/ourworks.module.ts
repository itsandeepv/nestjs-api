import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { OurworksSchema } from './ourworks.modal';
import { Ourworkcontroller } from './ourworks.controller';
import { OurworksProvider } from './ourworks.provider';



@Module({
  imports: [MongooseModule.forFeature([{name :"OurWorks" , schema: OurworksSchema}]) , MulterModule.register({
    dest: 'uploads/',
  }),],
  controllers: [Ourworkcontroller],
  providers: [OurworksProvider],
  exports:[]
})
export class OurworksModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
    //    consumer.apply(BlogsMiddleware).forRoutes("blogs")
   }
}
