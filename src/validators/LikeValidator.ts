import { ForbiddenError } from 'apollo-server';
import PostRepository from '../repositories/PostRepository';

class LikeValidator {
  private postRepository: PostRepository = PostRepository.Instance;

  async createLike(_: any, args: any, context: any) {
    const likeOld = await this.postRepository.findLike(
      args.input.postId,
      context.user._id
    );

    if (likeOld) {
      throw new ForbiddenError('Liked already exists');
    }
  }
}

export default LikeValidator;
