import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
/**
 *  Class to connect users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  /**
   * return all users from db
   */
  findAll(getUserParamDto: GetUserParamDto, limit: number, page: number) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      { id: 1, name: 'John Doe', email: 'john.doe@gmail.com' },
      { id: 2, name: 'Alice Smith', email: 'alice.smith@gmail.com' },
    ];
  }

  /**
   * return single user
   */
  findOneById(id: string) {
    return { id: id, name: 'John Doe', email: 'john.doe@gmail.com' };
  }
}
