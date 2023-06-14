import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { OurworksModel } from './ourworks/ourworks.modal';
import { BlogsModel } from './blogs/blogs.modal';
import { Blogscontroller } from './blogs/blogs.controller';
import { ConfigModule } from '@nestjs/config';
import cloudinaryConfig from './cloundanery/cloundanery.config';
import { CloudinaryModule } from './cloundanery/cloudinary.module';
import { OurworksModule } from './ourworks/ourworks.module';
import { UsersModule } from './auth/user/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cloudinaryConfig],
    }),
    BlogsModule,
    MongooseModule.forRoot(
      'mongodb+srv://sandeep:sandeepverma@companycluster.9imchgj.mongodb.net/',
    ),
    MulterModule.register({
      dest: 'uploads/',
    }),
    CloudinaryModule,
    OurworksModule,
    UsersModule
    
  ],
  controllers: [],
  providers: [  ],
  exports: [],
})
export class RouteModule {}
