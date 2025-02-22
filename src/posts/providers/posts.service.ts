import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  async create(@Body() createPostDto: CreatePostDto) {
    // create post
    const post = this.postRepository.create(createPostDto);

    // Add metaOptions to the post

    // return the post to the user
    return await this.postRepository.save(post);
  }
  async findAll(userId: string) {
    const user = this.userService.findOneById(userId);
    const posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return posts;
  }
}
