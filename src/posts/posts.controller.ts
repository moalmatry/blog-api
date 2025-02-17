import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dtos';
// "schema": "{r\n\"@context\":\"https:\/\/schema.org\",\r\n \"@type\":\"Person\"\r\n}",

@Controller('posts')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}
  @Get('/:userId')
  getPosts(@Param('userId') userId: string | undefined) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Create a new post',
    description: 'Create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'A new post has been created.',
  })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return 'Done';
  }

  @ApiOperation({
    summary: 'Update post',
    description: 'Update post',
  })
  @ApiResponse({
    status: 201,
    description: 'A  post has been updated.',
  })
  @Patch()
  updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);

    return 'done';
  }
}
