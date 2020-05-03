import FollowModel, { IFollow } from '../models/FollowModel';

class FollowRepository {
  private static _instance: FollowRepository = new FollowRepository();

  private constructor() {
    FollowRepository._instance = this;
  }

  public static getInstance() {
    return FollowRepository._instance;
  }

  async listFollowers(userId: String): Promise<IFollow[]> {
    return await FollowModel.find({ userFollowId: userId });
  }

  async listFollowing(userId: String): Promise<IFollow[]> {
    return await FollowModel.find({ userId });
  }

  async createFollow(userId: String, userFollowId: String): Promise<IFollow[]> {
    await FollowModel.create({ userId, userFollowId, date: new Date() });

    return await FollowModel.find({ userId });
  }

  async deleteFollow(userId: string, userFollowId: string): Promise<IFollow[]> {
    await FollowModel.deleteOne({ userId, userFollowId });

    return await FollowModel.find({ userId });
  }
}

export default FollowRepository;
