import PostRepository from '../repositories/PostRepository';
import convertFilter from '../utils/convertFilter';
import FollowRepository from '../repositories/FollowRepository';
import { IFollow } from '../models/FollowModel';

class PostController {
  public postRepository: PostRepository = PostRepository.Instance;
  public followRepository: FollowRepository = FollowRepository.Instance;

  public async listPosts(_: any, args: any) {
    const newFilters = convertFilter(args.filter, ['authorId'], ['author']);
    return await this.postRepository.allPost(newFilters || {});
  }

  public async listPostsFeed(_: any, args: any) {
    const followings = await this.followRepository.listFollowing(
      args.filter.userId
    );

    const followingsId: String[] = followings.reduce(
      (acc: String[], item: IFollow) => [...acc, item.userFollowId],
      [args.filter.userId]
    );

    let filter: any = { author: { $in: followingsId } };

    if (args.filter.search) {
      filter.text = { $regex: args.filter.search, $options: 'i' };
    }

    return await this.postRepository.allPost(filter, { dateCreated: '-1' });
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

  async getPostBySavedPost(savedPost: any) {
    return await this.postRepository.findPost(savedPost.postId);
  }
}

export default PostController;
