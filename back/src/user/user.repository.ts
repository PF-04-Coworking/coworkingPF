import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async getUsers() {
    let users = await this.userRepository.find();

    return users;
  }

  async getuserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { reservations: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    return user;
  }

  async createUser(user: Partial<User>) {
    const newUser = await this.userRepository.save(user);

    const dbUser = await this.userRepository.findOne({
      where: { id: newUser.id },
      relations: { reservations: true },
    });

    return user;
  }

  async updateUser(id: string, user: User) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
    await this.userRepository.update(id, user);

    return user;
  }

  async deleteById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    await this.userRepository.remove(user);
    return `User with id ${id} was deleted successfully`;
  }

  async signUp(user: Partial<User>) {
    const { email, password } = user;

    const foundUser = await this.userRepository.findOne({ where: { email } });

    if (foundUser)
      throw new BadRequestException(
        `Email ${email} is already a registered account`,
      );

    return await this.createUser(user);
  }

  async signIn(email: string, password: string){
    const user = await this.userRepository.findOne({where:{email}});
    if (!user) throw new BadRequestException(`Wrong credentials`);

    const userPass = await this.userRepository.findOne({where:{password}})

    if (user !== userPass) throw new BadRequestException(`Wrong credentials`);
    
    return `Successfully signed in. Welcome ${user.name}`
  }

}
