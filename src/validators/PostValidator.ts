import { ForbiddenError } from 'apollo-server';
import PostRepository from '../repositories/PostRepository';

class PostValidator {
  private postRepository: PostRepository = PostRepository.Instance;

  async updatePost(_: any, args: any, context: any) {
    const post = await this.postRepository.findPost(args.input.postId);

    if (context.user._id !== post!.authorId.toString()) {
      throw new ForbiddenError(
        'Authenticated user is not the author of the text'
      );
    }
  }

  async deletePost(_: any, args: any, context: any) {
    const post = await this.postRepository.findPost(args.input.postId);

    if (context.user._id !== post!.authorId.toString()) {
      throw new ForbiddenError(
        'Authenticated user is not the author of the text'
      );
    }
  }
}

export default PostValidator;
