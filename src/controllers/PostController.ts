import { ForbiddenError } from 'apollo-server';
import PostRepository from '../repositories/PostRepository';
import FollowRepository from '../repositories/FollowRepository';
import UserRepository from '../repositories/UserRepository';
import { IFollow } from '../models/FollowModel';
import { IUser } from '../models/UserModel';

class PostController {
  private postRepository: PostRepository = PostRepository.Instance;
  private followRepository: FollowRepository = FollowRepository.Instance;
  private userRepository: UserRepository = UserRepository.Instance;

  async listPosts(_: any, args: any) {
    return await this.postRepository.allPost(args.filter || {}, {
      dateCreated: '-1'
    });
  }

  async listPostsFeed(_: any, args: any, context: any) {
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

  async listPostsByLocation(_: any, args: any, context: any) {
    const users = await this.userRepository.allUsersByLocation(
      args.filter.longitude,
      args.filter.latitude
    );

    const usersId: String[] = users.reduce(
      (acc: String[], item: IUser) =>
        item._id.toString() === context.user._id ? acc : [...acc, item._id],
      []
    );

    return await this.postRepository.allPost(
      { authorId: { $in: usersId } },
      { dateCreated: '-1' }
    );
  }

  async getPost(_: any, args: any) {
    return await this.postRepository.findPost(args.postId);
  }

  async createPost(_: any, args: any, context: any) {
    return await this.postRepository.createPost({
      text: args.input.text,
      authorId: context.user._id,
      dateCreated: new Date(),
      dateUpdated: new Date()
    });
  }

  async updatePost(_: any, args: any, context: any) {
    const post = await this.postRepository.findPost(args.input.postId);

    if (context.user._id !== post!.authorId.toString()) {
      throw new ForbiddenError(
        'Authenticated user is not the author of the text'
      );
    }

    return await this.postRepository.updatePost(args.input.postId, {
      text: args.input.text,
      dateUpdated: new Date()
    });
  }

  async deletePost(_: any, args: any, context: any) {
    const post = await this.postRepository.findPost(args.input.postId);

    if (context.user._id !== post!.authorId.toString()) {
      throw new ForbiddenError(
        'Authenticated user is not the author of the text'
      );
    }

    return await this.postRepository.deletePost(args.input.postId);
  }

  async getPostBySavedPost(savedPost: any) {
    return await this.postRepository.findPost(savedPost.postId);
  }
}

export default PostController;
