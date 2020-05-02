import UserRepository from '../repositories/UserRepository';

class UserController {
  public userRepository: UserRepository = UserRepository.getInstance();

  public async listUsers() {
    return await this.userRepository.allUsers();
  }
}

export default UserController;
