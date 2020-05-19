import UserRepository from '../repositories/UserRepository';
import SavedPostModel from '../models/SavedPostModel';

class SavedPostController {
  private userRepository: UserRepository = UserRepository.Instance;

  async createSavedPost(_: any, args: any) {
    const savedPost = new SavedPostModel();
    savedPost.postId = args.input.postId;
    savedPost.date = new Date();

    await this.userRepository.createSavedPost(args.input.userId, savedPost);

    const user = await this.userRepository.findUser(args.input.userId);
    return user!.savedPosts;
  }

  async deleteSavedPost(_: any, args: any) {
    await this.userRepository.deleteSavedPost(
      args.input.userId,
      args.input.postId
    );

    const user = await this.userRepository.findUser(args.input.userId);
    return user!.savedPosts;
  }

  async getSavedPostsByUser(user: any) {
    return user.savedPosts;
  }
}

export default SavedPostController;
