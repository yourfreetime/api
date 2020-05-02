import PostModel, { IPost } from '../models/PostModel';

class PostRepository {
  private static _instance: PostRepository = new PostRepository();

  private constructor() {
    PostRepository._instance = this;
  }

  public static getInstance() {
    return PostRepository._instance;
  }

  async allPost(): Promise<IPost[]> {
    return await PostModel.find({});
  }

  async findPost(postId: String): Promise<IPost | null> {
    return await PostModel.findById(postId);
  }

  async createPost(post: IPost | any): Promise<IPost> {
    return await PostModel.create(post);
  }

  async updatePost(id: String, post: IPost): Promise<IPost> {
    return await PostModel.updateOne({ _id: id }, post);
  }

  async deletePost(postId: String): Promise<boolean> {
    const result = await PostModel.deleteOne(postId);

    return !!result.ok;
  }
}

export default PostRepository;
