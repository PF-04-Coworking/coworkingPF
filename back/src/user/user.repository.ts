import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
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

    return dbUser;
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
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Wrong credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new BadRequestException('Wrong credentials');
    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return { message: `Successfully signed in. Welcome ${user.name}`, token };
  }
}
