import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}
  @Get('/:userId?')
  getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
