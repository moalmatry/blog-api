import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Module({
  controllers: [PostController],
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([Post, MetaOption]), UsersModule],
})
export class PostsModule {}
