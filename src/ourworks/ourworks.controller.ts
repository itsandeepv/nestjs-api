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
import { Ourworks } from './ourworks.modal';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { multerConfig } from '../blogs/multer-config';
import { CloudinaryService } from 'src/cloundanery/cloudinary.service';
import { OurworksProvider } from './ourworks.provider';
// import { Ourworks } from './blogsdata/ourworks.data';

@Controller('ourworks')
export class Ourworkcontroller {
  constructor(private ourworkProvider: OurworksProvider) {}
  //for post

  @Post('/add-ourworks')
  @UseInterceptors(FileInterceptor('siteimages', multerConfig))
  addBwork(
    @UploadedFile() file,
    @Body()
    ourwork: {
      name: string;
      description: string;
      websiteLink: string;
      title: string;
      review: Number;
      siteimages: [];
    },
  ) {
    return this.ourworkProvider.addBlogs(ourwork, file);
  }

  @Put('/update-ourworks/:id')
  updateworks(@Param('id') ourworkId: any, @Body() ourwork: Ourworks) {
    return this.ourworkProvider.updateBlogs(ourworkId, ourwork);
  }
  @Get('/get-ourworks')
  findAllBlogs() {
    return this.ourworkProvider.findAllBlogs();
  }

  @Get('/get-ourworks/:id')
  findworksbyId(@Param('id') workId: any) {
    return this.ourworkProvider.findBlogsbyId(workId);
  }

  //for delete

  @Delete('/delete-ourworks/:id')
  deleteworks(@Param('id') workId: string) {
    return this.ourworkProvider.deleteBlogs(workId);
  }
}
