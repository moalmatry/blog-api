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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Route for getting all users with pagination
  // @Get()
  // getAllUsers(
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  // ) {
  //   return this.usersService.findAll({ id: null }, limit, page);
  // }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Get a single user by their ID',
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Limit the number of returned users',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'return page index',
    example: 10,
  })
  getUser(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch()
  patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
