import { ForbiddenError } from 'apollo-server';
import PostRepository from '../repositories/PostRepository';

class CommentValidator {
  public postRepository: PostRepository = PostRepository.Instance;

  async updateComment(_: any, args: any, context: any) {
    const comment = await this.postRepository.findComment(
      args.input.postId,
      args.input.commentId
    );

    if (context.user._id !== comment!.userId.toString()) {
      throw new ForbiddenError(
        'Authenticated user is not the author of the text'
      );
    }
  }

  async deleteComment(_: any, args: any, context: any) {
    const comment = await this.postRepository.findComment(
      args.input.postId,
      args.input.commentId
    );

    if (context.user._id !== comment!.userId.toString()) {
      throw new ForbiddenError(
        'Authenticated user is not the author of the text'
      );
    }
  }
}

export default CommentValidator;
