import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/Users.entity';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getuserById(id);
  }

  createUser(user: User) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: User) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteById(id: string) {
    return this.usersRepository.deleteById(id);
  }

  signUp(user: User) {
    return this.usersRepository.signUp(user);
  }

  signIn(email: string, password: string) {
    return this.usersRepository.signIn(email, password);
  }
}
