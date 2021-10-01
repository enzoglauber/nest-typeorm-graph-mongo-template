import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserInput } from './user.input';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  
  @Query(() => String)
  async hello() {
    return 'world';
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return this.userService.create(input);
  }
}