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
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(
    // Injecting Users Services
    private readonly usersService: UsersService,
  ) {}
  @Get('/:id?')
  getUsers(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(10)) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
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
