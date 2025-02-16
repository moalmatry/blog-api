import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UsersService) {}
  findAll(userId: string) {
    const user = this.userService.findOneById(userId);
    console.log(userId);
    return [
      {
        user,
        id: 1,
        title: 'My First Post',
        content: 'This is the content of my first post.',
        userId: userId,
      },
    ];
  }
}
