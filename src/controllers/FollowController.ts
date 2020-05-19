import { ForbiddenError } from 'apollo-server';
import FollowRepository from '../repositories/FollowRepository';

class FollowController {
  private followRepository: FollowRepository = FollowRepository.Instance;

  async listFollowers(_: any, args: any) {
    return await this.followRepository.listFollowers(args.filter.userId);
  }

  async listFollowing(_: any, args: any) {
    return await this.followRepository.listFollowing(args.filter.userId);
  }

  async createFollow(_: any, args: any, context: any) {
    return await this.followRepository.createFollow(
      context.user._id,
      args.input.userFollowId
    );
  }

  async deleteFollow(_: any, args: any, context: any) {
    return await this.followRepository.deleteFollow(
      context.user._id,
      args.input.userFollowId
    );
  }
}

export default FollowController;
