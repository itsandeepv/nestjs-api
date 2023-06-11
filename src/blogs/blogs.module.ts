import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Blogscontroller } from './blogs.controller';
import { BlogsProvider } from './blogs.provider';
import { BlogsMiddleware } from './blogs.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './blogs.modal';
import { MulterModule } from '@nestjs/platform-express';



@Module({
  imports: [MongooseModule.forFeature([{name :"Blog" , schema: BlogSchema}]) , MulterModule.register({
    dest: 'uploads/',
  }),],
  controllers: [Blogscontroller],
  providers: [BlogsProvider],
  exports:[]
})
export class BlogsModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
       consumer.apply(BlogsMiddleware).forRoutes("blogs")
   }
}
