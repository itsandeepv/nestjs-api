import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserSchema } from './users.modal';
import { MongooseModule } from '@nestjs/mongoose';
import { userscontroller } from './users.controller';
import { UsersProvider } from './users.provider';



@Module({
  imports: [MongooseModule.forFeature([{name :"User" , schema: UserSchema}]) , MulterModule.register({
    dest: 'uploads/',
  }),],
  controllers: [userscontroller],
  providers: [UsersProvider],
  exports:[]
})
export class UsersModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      //  consumer.apply(BlogsMiddleware).forRoutes("blogs")
   }
}
