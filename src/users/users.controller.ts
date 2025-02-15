import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  @Get('/:id?')
  getUsers(
    @Param() GetUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(10)) page: number,
  ) {
    console.log(typeof limit);
    console.log(typeof limit);
    console.log(GetUserParamDto);
    return 'You Send requests to the end point';
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('--------------------------------');
    console.log(typeof createUserDto);
    console.log('--------------------------------');
    return 'You Send Post Request Create a new user';
  }

  @Patch()
  patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
