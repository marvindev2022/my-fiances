import { inMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { UserService } from './users.service';
import { User } from '@domain/User/User';

describe('User', () => {
  class PhoneValidatorMock {
    execute() {
      return 'valid_phone';
    }
  }

  it('should register a new user', async () => {
    const userRepository = new inMemoryUserRepository();
    const userService = new UserService(
      userRepository,
      new PhoneValidatorMock(),
    );

    const newUser = new User({
      name: 'any_name',
      email: 'any_email@mail.com',
      birthDay: new Date(),
      photo: 'any_photo',
      password: 'any_password',
      phone: 'any_phone',
      address: {
        cep: 'any_cep',
        complement: 'any_complement',
        number: 'any_number',
      },
    });

    if (!newUser.props) {
      throw new Error('Error creating new user');
    }

    const user = await userService.register(newUser.props);

    expect(userRepository.users[0]).toEqual(user);
    expect(
      userRepository.users[0].props?.password !== 'any_password',
    ).toBeTruthy();
  });
});
