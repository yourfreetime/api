import PostRepository from '../repositories/PostRepository';
import LikeModel from '../models/LikeModel';

class LikeController {
  public postRepository: PostRepository = PostRepository.getInstance();

  async createLike(_: any, args: any) {
    const like = new LikeModel();
    like.userId = args.input.userId;
    like.date = new Date();

    this.postRepository.createLike(args.input.postId, like);

    const post = await this.postRepository.findPost(args.input.postId);
    return post!.likes;
  }

  async deleteLike(_: any, args: any) {
    this.postRepository.deleteLike(args.input.postId, args.input.userId);

    const post = await this.postRepository.findPost(args.input.postId);
    return post!.likes;
  }

  async getLikesByPost(post: any) {
    return post.likes;
  }
}

export default LikeController;
