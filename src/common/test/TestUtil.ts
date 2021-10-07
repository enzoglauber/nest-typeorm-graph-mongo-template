import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';

import { User } from './../../user/user.entity';

export const mockAddAccountParams: CreateUserInput = {
  name: 'Test User',
  email: 'user@email.com',
  password: '123456'
};

export const mockUpdateUserParams: UpdateUserInput = {
  _id: '1',
  email: 'email-updated@email.com',
};

export const mockUserModel: User = {
  _id: '1',
  ...mockAddAccountParams,
};

export const mockUpdatedUserModel: User = {
  ...mockUserModel,
  email: 'updated-email@email.com',
};

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    _id: '2',
    name: 'Test User 2',
    email: 'email2@email.com',
    password: '123456'
  },
  {
    _id: '3',
    name: 'Test User 3',
    email: 'email3@email.com',
    password: '123456'
  },
];
