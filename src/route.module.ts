import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { OurworksController } from './ourworks/ourworks.controller';
import { OurworksModel } from './ourworks/ourworks.modal';
import { BlogsModel } from './blogs/blogs.modal';
import { Blogscontroller } from './blogs/blogs.controller';

@Module({
  imports: [
    BlogsModule,
    MongooseModule.forRoot(
      'mongodb+srv://sandeep:sandeepverma@companycluster.9imchgj.mongodb.net/',
    ),
    MulterModule.register({
      dest: 'uploads/',
    }),
    
  ],
  controllers: [OurworksController],
  providers: [  ],
  exports: [],
})
export class RouteModule {}
