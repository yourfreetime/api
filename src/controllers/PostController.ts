import PostRepository from '../repositories/PostRepository';

class PostController {
  public postRepository: PostRepository = PostRepository.getInstance();

  public async listPosts() {
    return await this.postRepository.allPost();
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
