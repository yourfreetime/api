import FollowRepository from '../repositories/FollowRepository';

class FollowController {
  public followRepository: FollowRepository = FollowRepository.Instance;

  public async listFollowers(_: any, args: any) {
    return await this.followRepository.listFollowers(args.filter.userId);
  }

  public async listFollowing(_: any, args: any) {
    return await this.followRepository.listFollowing(args.filter.userId);
  }

  public async createFollow(_: any, args: any, context: any) {
    return await this.followRepository.createFollow(
      context.user._id,
      args.input.userFollowId
    );
  }

  public async deleteFollow(_: any, args: any, context: any) {
    return await this.followRepository.deleteFollow(
      context.user._id,
      args.input.userFollowId
    );
  }
}

export default FollowController;
