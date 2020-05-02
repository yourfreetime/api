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
}

export default PostController;
