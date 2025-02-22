import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  login(email: string, password: string, id: string) {
    // const user = this.usersService.findOneById('1');
    // Check User in Database
    // Login
    // Token
    return 'SAMPLE_USER';
  }

  isAuth() {
    return true;
  }
}
