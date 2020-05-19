import PostRepository from '../repositories/PostRepository';
import CommentModel from '../models/CommentModel';

class CommentController {
  private postRepository: PostRepository = PostRepository.Instance;

  async createComment(_: any, args: any, context: any) {
    const comment = new CommentModel();
    comment.userId = context.user._id;
    comment.text = args.input.text;
    comment.dateCreated = new Date();
    comment.dateUpdated = new Date();

    await this.postRepository.createComment(args.input.postId, comment);

    const post = await this.postRepository.findPost(args.input.postId);
    return post!.comments;
  }

  async updateComment(_: any, args: any) {
    await this.postRepository.updateComment(
      args.input.postId,
      args.input.commentId,
      args.input.text
    );

    const post = await this.postRepository.findPost(args.input.postId);
    return post!.comments;
  }

  async deleteComment(_: any, args: any) {
    await this.postRepository.deleteComment(
      args.input.postId,
      args.input.commentId
    );

    const post = await this.postRepository.findPost(args.input.postId);
    return post!.comments;
  }

  async getCommentsByPost(post: any) {
    return post.comments;
  }
}

export default CommentController;
