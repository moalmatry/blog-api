import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostController],
  providers: [PostsService],
  imports: [UsersModule],
})
export class PostsModule {}
