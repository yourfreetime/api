import UserRepository from '../repositories/UserRepository';
import UserModel from '../models/UserModel';

class UserController {
  public userRepository: UserRepository = UserRepository.getInstance();

  public async listUsers() {
    return await this.userRepository.allUsers();
  }

  public async createUser(_: any, args: any) {
    const user = new UserModel();
    user.name = args.input.name;
    user.email = args.input.email;
    user.picture = args.input.picture;
    user.password = args.input.password;
    user.dateCreated = new Date();
    user.dateUpdated = new Date();

    return await this.userRepository.createUser(user);
  }

  public async getByPost(post: any) {
    return await this.userRepository.findUser(post.author);
  }
}

export default UserController;
