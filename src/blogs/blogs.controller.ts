import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BlogsProvider } from './blogs.provider';
import { Blogs, BlogsModel } from './blogs.modal';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { multerConfig } from './multer-config';
import { CloudinaryService } from 'src/cloundanery/cloudinary.service';
// import { Blogs } from './blogsdata/blogs.data';

@Controller('blogs')
export class Blogscontroller {

  private readonly cloudinaryService: CloudinaryService

  constructor(private blogsProvider: BlogsProvider) {}

  //for post

  @Post('/add-blogs')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  addBlogs(
    @UploadedFile() file,
    @Body()
    blog: {
      title: string;
      description: string;
      author: string;
      published: string;
      content: string;
      image: [];
    },
  ) {
    
    return this.blogsProvider.addBlogs(blog, file);
  }

  @Put('/update-blogs/:id')
  updateblog(@Param('id') blogId: any, @Body() blog: Blogs) {
    return this.blogsProvider.updateBlogs(blogId, blog);
  }
  @Get('/get-blogs')
  findAllBlogs() {
    return this.blogsProvider.findAllBlogs();
  }

  @Get('/get-blogs/:id')
  findBlogsbyId(@Param('id') blogId: any) {
    return this.blogsProvider.findBlogsbyId(blogId);
  }

  //for delete

  @Delete('/delete-blogs/:id')
  deleteBlogs(@Param('id') blogId: string) {
    return this.blogsProvider.deleteBlogs(blogId);
  }
}
