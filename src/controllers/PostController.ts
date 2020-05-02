import PostRepository from '../repositories/PostRepository';

class PostController {
  public postRepository: PostRepository = PostRepository.getInstance();

  public async getPosts() {
    return await this.postRepository.allPost();
  }
}

export default PostController;
