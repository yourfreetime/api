import UserRepository from '../repositories/UserRepository';
import SavedPostModel from '../models/SavedPostModel';

class SavedPostController {
  private userRepository: UserRepository = UserRepository.Instance;

  async listSavedPosts(_: any, args: any) {
    return await this.userRepository.allSavedPosts(args.filter.userId);
  }

  async createSavedPost(_: any, args: any, context: any) {
    const savedPost = new SavedPostModel();
    savedPost.postId = args.input.postId;
    savedPost.date = new Date();

    await this.userRepository.createSavedPost(context.user._id, savedPost);

    const user = await this.userRepository.findUser(context.user._id);
    return user!.savedPosts;
  }

  async deleteSavedPost(_: any, args: any, context: any) {
    await this.userRepository.deleteSavedPost(
      context.user._id,
      args.input.postId
    );

    const user = await this.userRepository.findUser(context.user._id);
    return user!.savedPosts;
  }

  async getSavedPostsByUser(user: any) {
    return user.savedPosts;
  }
}

export default SavedPostController;
