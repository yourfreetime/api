import UserRepository from '../repositories/UserRepository';
import UserModel from '../models/UserModel';

class UserController {
  private userRepository: UserRepository = UserRepository.Instance;

  async listUsers(_: any, args: any) {
    return await this.userRepository.allUsers(args.filter || {});
  }

  async getUser(_: any, args: any) {
    return await this.userRepository.findUser(args.userId);
  }

  async createUser(_: any, args: any) {
    const user = new UserModel();
    user.name = args.input.name;
    user.email = args.input.email;
    user.picture = args.input.picture;
    user.password = args.input.password;
    user.dateCreated = new Date();
    user.dateUpdated = new Date();

    return await this.userRepository.createUser(user);
  }

  async updateUser(_: any, args: any) {
    const user = await this.userRepository.findUser(args.input.userId);
    user!.name = args.input.name || user!.name;
    user!.email = args.input.email || user!.email;
    user!.picture = args.input.picture || user!.picture;
    user!.password = args.input.password || user!.password;
    user!.dateUpdated = new Date();

    await this.userRepository.updateUser(args.input.userId, user!);
    return this.userRepository.findUser(args.input.userId);
  }

  async deleteUser(_: any, args: any) {
    return await this.userRepository.deleteUser(args.input.userId);
  }

  async setLocation(_: any, args: any, context: any) {
    const user = await this.userRepository.findUser(context.user._id);
    user!.location = {
      type: 'Point',
      coordinates: [args.input.longitude, args.input.latitude],
    };

    await this.userRepository.updateUser(context.user._id, user!);
    return this.userRepository.findUser(context.user._id);
  }

  async getAuthorByPost(post: any) {
    return await this.userRepository.findUser(post.authorId);
  }

  async getUserByFollow(follow: any) {
    return await this.userRepository.findUser(follow.userId);
  }

  async getUserFollowByFollow(follow: any) {
    return await this.userRepository.findUser(follow.userFollowId);
  }

  async getUserByLike(like: any) {
    return await this.userRepository.findUser(like.userId);
  }

  async getUserByComment(comment: any) {
    return await this.userRepository.findUser(comment.userId);
  }
}

export default UserController;
