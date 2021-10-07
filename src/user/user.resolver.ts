import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.createUser(data);
  }

  @Query(() => User)
  async user(@Args('_id') _id: string): Promise<User> {
    return this.userService.getUserById(_id);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id') _id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser({ _id, ...data });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('_id') _id: string): Promise<true> {
    await this.userService.deleteUser(_id);
    return true;
  }
}
