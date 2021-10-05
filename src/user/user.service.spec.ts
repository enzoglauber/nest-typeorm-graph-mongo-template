import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockAddAccountParams,
  mockUpdatedUserModel,
  mockUpdateUserParams,
  mockUserArrayModel,
  mockUserModel,
} from './../common/test/TestUtil';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockUserArrayModel),
    findOne: jest.fn().mockReturnValue(mockUserModel),
    create: jest.fn().mockReturnValue(mockUserModel),
    save: jest.fn().mockReturnValue(mockUserModel),
    update: jest.fn().mockReturnValue(mockUpdatedUserModel),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search all users', () => {
    it('Should list all users', async () => {
      const users = service.findAllUsers();

      expect(users).resolves.toBe(mockUserArrayModel);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search user By Id', () => {
    it('Should find a existing user', async () => {
      const userFound = service.getUserById('1');

      expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel._id);
      expect(userFound).resolves.toBe(mockUserModel);
    });

    it('Should return a exception when does not to find a user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      await service.getUserById('3').catch(error => {
        expect(error.message).toEqual('User not found');
        expect(mockRepository.findOne).toHaveBeenCalledWith('3');
      });
    });
  });

  describe('When create a user', () => {
    it('Should create a user', async () => {
      const user = service.createUser(mockAddAccountParams);
      expect(mockRepository.save).toBeCalled();
      expect(user).resolves.toBe(mockUserModel);
    });
  });

  describe('When update user', () => {
    it('Should update a user', async () => {
      service.getUserById = jest.fn().mockReturnValueOnce(mockUserModel);

      const userUpdated = service.updateUser(mockUpdateUserParams);

      expect(service.getUserById).toHaveBeenCalledWith(mockUpdateUserParams._id);
      expect(userUpdated).resolves.toBe(mockUpdatedUserModel);
    });

    describe('When delete user', () => {
      it('Should delete a existing user', async () => {
        service.getUserById = jest.fn().mockReturnValueOnce(mockUserModel);

        await service.deleteUser('1');

        expect(service.getUserById).toHaveBeenCalledWith('1');
        expect(mockRepository.delete).toBeCalledWith(mockUserModel);
      });

      it('Should return an internal server error if repository does not delete the user', async () => {
        service.getUserById = jest.fn().mockReturnValueOnce(mockUserModel);
        mockRepository.delete.mockReturnValueOnce(null);

        const deletedUser = service.deleteUser('1');


        await service.deleteUser('1').catch(error => {
          expect(service.getUserById).toHaveBeenCalledWith('1');
          expect(mockRepository.delete).toBeCalledWith(mockUserModel);
          expect(deletedUser).rejects.toThrow(InternalServerErrorException);

          expect(error.message).toEqual('User not found');
        });
      });
    });
  });
});
