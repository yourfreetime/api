import PostModel, { IPost } from '../models/PostModel';
import { ILike } from '../models/LikeModel';
import { IComment } from '../models/CommentModel';
class PostRepository {
  private static _instance: PostRepository = new PostRepository();

  private constructor() {
    PostRepository._instance = this;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  async allPost(filter: object, sort: any = []): Promise<IPost[]> {
    return await PostModel.find(filter).sort(sort);
  }

  async findPost(postId: String): Promise<IPost | null> {
    return await PostModel.findById(postId);
  }

  async createPost(post: IPost | any): Promise<IPost> {
    return await PostModel.create(post);
  }

  async updatePost(id: String, post: IPost | any): Promise<IPost | null> {
    await PostModel.updateOne({ _id: id }, post);

    return await PostModel.findById(id);
  }

  async deletePost(postId: String): Promise<Boolean> {
    const result = await PostModel.deleteOne({ _id: postId });

    return !!result.n && result.n > 0;
  }

  async createLike(postId: String, like: ILike): Promise<IPost> {
    return await PostModel.updateOne(
      { _id: postId },
      { $push: { likes: like } }
    );
  }

  async deleteLike(postId: String, userId: String): Promise<IPost> {
    return await PostModel.updateOne(
      { _id: postId },
      { $pull: { likes: { userId: userId } } }
    );
  }

  async findComment(
    postId: String,
    commentId: String
  ): Promise<IComment | undefined> {
    const post = await this.findPost(postId);
    return post!.comments.find(comment => comment._id.toString() === commentId);
  }

  async createComment(postId: String, comment: IComment): Promise<IPost> {
    return await PostModel.updateOne(
      { _id: postId },
      { $push: { comments: comment } }
    );
  }

  async updateComment(
    postId: String,
    commentId: String,
    text: String
  ): Promise<IPost> {
    return await PostModel.updateOne(
      { _id: postId, 'comments._id': commentId },
      {
        $set: { 'comments.$.text': text, 'comments.$.dateUpdated': new Date() }
      }
    );
  }

  async deleteComment(postId: String, commentId: String): Promise<IPost> {
    return await PostModel.updateOne(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } }
    );
  }
}

export default PostRepository;
