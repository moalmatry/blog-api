import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';

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
    // Find Author
    const author = await this.userService.findOneById(createPostDto.authorId);

    // create post
    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
    });

    // Add metaOptions to the post

    // return the post to the user
    return await this.postRepository.save(post);
  }
  async findAll(userId: string) {
    // const user = this.userService.findOneById(userId);
    const posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
        // author: true,
      },
    });

    return posts;
  }

  async delete(id: number) {
    // Find the post
    // const post = await this.postRepository.findOneBy({ id });

    // Delete the post
    await this.postRepository.delete(id);

    // // Delete the metaOptions
    // await this.metaOptionRepository.delete(post.metaOptions.id);

    // send that the message deleted
    return { deleted: true, id, message: 'Post deleted' };
  }
}
