import PostRepository from '../repositories/PostRepository';
import convertFilter from '../utils/convertFilter';

class PostController {
  public postRepository: PostRepository = PostRepository.getInstance();

  public async listPosts(_: any, args: any) {
    const newFilters = convertFilter(args.filter, ['authorId'], ['author']);
    return await this.postRepository.allPost(newFilters || {});
  }

  public async getPost(_: any, args: any) {
    return await this.postRepository.findPost(args.postId);
  }

  public async createPost(_: any, args: any) {
    return await this.postRepository.createPost({
      text: args.input.text,
      author: args.input.authorId,
      dateCreated: new Date(),
      dateUpdated: new Date()
    });
  }

  public async updatePost(_: any, args: any) {
    return await this.postRepository.updatePost(args.input.postId, {
      text: args.input.text,
      dateUpdated: new Date()
    });
  }

  public async deletePost(_: any, args: any) {
    return await this.postRepository.deletePost(args.input.postId);
  }
}

export default PostController;
