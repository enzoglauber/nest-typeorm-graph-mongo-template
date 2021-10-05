import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as uuid from 'uuid';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const user = new User();
    user._id = uuid.v4();
    user.name = data.name;
    user.email = data.email;
    return this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(data: UpdateUserInput): Promise<User> {
    const user = await this.getUserById(data._id);
    return this.userRepository.save({ ...user, ...data });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    const userDeleted = await this.userRepository.delete(user);
    if (!userDeleted) {
      throw new InternalServerErrorException();
    }
  }
}
