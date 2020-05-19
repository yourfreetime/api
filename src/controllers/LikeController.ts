import { ForbiddenError } from 'apollo-server';
import PostRepository from '../repositories/PostRepository';
import LikeModel from '../models/LikeModel';

class LikeController {
  private postRepository: PostRepository = PostRepository.Instance;

  async createLike(_: any, args: any, context: any) {
    const like = new LikeModel();
    like.userId = context.user._id;
    like.date = new Date();

    await this.postRepository.createLike(args.input.postId, like);

    const post = await this.postRepository.findPost(args.input.postId);
    return post!.likes;
  }

  async deleteLike(_: any, args: any, context: any) {
    await this.postRepository.deleteLike(args.input.postId, context.user._id);

    const post = await this.postRepository.findPost(args.input.postId);
    return post!.likes;
  }

  async getLikesByPost(post: any) {
    return post.likes;
  }
}

export default LikeController;
