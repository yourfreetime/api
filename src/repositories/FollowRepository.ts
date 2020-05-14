import FollowModel, { IFollow } from '../models/FollowModel';

class FollowRepository {
  private static _instance: FollowRepository = new FollowRepository();

  private constructor() {
    FollowRepository._instance = this;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  async getFollow(
    userId: String,
    userFollowId: String
  ): Promise<IFollow | null> {
    return await FollowModel.findOne({ userId, userFollowId });
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
