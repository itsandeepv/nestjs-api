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
import { Users } from './users.modal';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../blogs/multer-config';
import { CloudinaryService } from 'src/cloundanery/cloudinary.service';
import { UsersProvider } from './users.provider';
// import { users } from './usersdata/users.data';

@Controller('user')
export class userscontroller {
  constructor(private usersProvider: UsersProvider) {}

  //for post

  @Post('/add-users')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  addAdmin(
    @UploadedFile() file,
    @Body()
    user: {
      fname: string;
      lname: string;
      email: string;
      password: string;
      role: string;
      address: string;
      image: [];
    },
  ) {
    return this.usersProvider.addadmin(user, file);
  }

  @Post('/add-admin')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  addusers(
    @UploadedFile() file,
    @Body()
    user: {
      fname: string;
      lname: string;
      email: string;
      password: string;
      role: string;
      address: string;
      image: [];
    },
  ) {
    return this.usersProvider.addusers(user, file);
  }

  @Put('/update-users/:id')
  updateblog(@Param('id') blogId: any, @Body() blog: Users) {
    return this.usersProvider.updateUsers(blogId, blog);
  }
  @Get('/get-users')
  findAllusers() {
    return this.usersProvider.findAlluser();
  }
  @Post('/login')
  loginusers(
    @Body()
    user: {
      email: string;
      password: string;
    },
  ) {
    return this.usersProvider.loginUser(user);
  }

  @Get('/get-users/:id')
  findBlogsbyId(@Param('id') blogId: any) {
    return this.usersProvider.findUsersbyId(blogId);
  }

  //for delete

  @Delete('/delete-users/:id')
  deleteusers(@Param('id') blogId: string) {
    return this.usersProvider.deleteUser(blogId);
  }
}
