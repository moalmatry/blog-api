import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
/**
 *  Class to connect users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async createUser(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    // Handle error if user already exists

    // Create user
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }
}
