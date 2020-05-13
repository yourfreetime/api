import PostRepository from '../repositories/PostRepository';
import FollowRepository from '../repositories/FollowRepository';
import UserRepository from '../repositories/UserRepository';
import { IFollow } from '../models/FollowModel';
import { IUser } from '../models/UserModel';

class PostController {
  public postRepository: PostRepository = PostRepository.Instance;
  public followRepository: FollowRepository = FollowRepository.Instance;
  public userRepository: UserRepository = UserRepository.Instance;

  public async listPosts(_: any, args: any) {
    return await this.postRepository.allPost(args.filter || {});
  }

  public async listPostsFeed(_: any, args: any, context: any) {
    const followings = await this.followRepository.listFollowing(
      context.user._id
    );

    const followingsId: String[] = followings.reduce(
      (acc: String[], item: IFollow) => [...acc, item.userFollowId],
      [context.user._id]
    );

    let filter: any = { authorId: { $in: followingsId } };

    if (args.filter && args.filter.search) {
      filter.text = { $regex: args.filter.search, $options: 'i' };
    }

    return await this.postRepository.allPost(filter, { dateCreated: '-1' });
  }

  public async listPostsByLocation(_: any, args: any) {
    const users = await this.userRepository.allUsersByLocation(
      args.filter.longitude,
      args.filter.latitude
    );

    const usersId: String[] = users.reduce(
      (acc: String[], item: IUser) =>
        item._id.toString() === args.filter.userId ? acc : [...acc, item._id],
      []
    );

    return await this.postRepository.allPost(
      { authorId: { $in: usersId } },
      { dateCreated: '-1' }
    );
  }

  public async getPost(_: any, args: any) {
    return await this.postRepository.findPost(args.postId);
  }

  public async createPost(_: any, args: any) {
    return await this.postRepository.createPost({
      text: args.input.text,
      authorId: args.input.authorId,
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
