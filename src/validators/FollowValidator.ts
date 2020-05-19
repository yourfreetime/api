import { ForbiddenError } from 'apollo-server';
import FollowRepository from '../repositories/FollowRepository';

class FollowValidator {
  private followRepository: FollowRepository = FollowRepository.Instance;

  async createFollow(_: any, args: any, context: any) {
    const follow = await this.followRepository.getFollow(
      context.user._id,
      args.input.userFollowId
    );

    if (follow) {
      throw new ForbiddenError('Follower already exists');
    }
  }
}

export default FollowValidator;
