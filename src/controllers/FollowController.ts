import FollowRepository from '../repositories/FollowRepository';

class FollowController {
  public followRepository: FollowRepository = FollowRepository.getInstance();

  public async listFollowers(_: any, args: any) {
    return await this.followRepository.listFollowers(args.filter.userId);
  }

  public async listFollowing(_: any, args: any) {
    return await this.followRepository.listFollowing(args.filter.userId);
  }

  public async createFollow(_: any, args: any) {
    return await this.followRepository.createFollow(
      args.input.userId,
      args.input.userFollowId
    );
  }

  public async deleteFollow(_: any, args: any) {
    return await this.followRepository.deleteFollow(
      args.input.userId,
      args.input.userFollowId
    );
  }
}

export default FollowController;
