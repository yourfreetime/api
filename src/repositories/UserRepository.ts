import UserModel, { IUser } from '../models/UserModel';
import { ISavedPost } from '../models/SavedPostModel';

class UserRepository {
  private static _instance: UserRepository = new UserRepository();

  private constructor() {
    if (UserRepository._instance) {
      throw new Error(
        'Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.'
      );
    }

    UserRepository._instance = this;
  }

  public static getInstance() {
    return UserRepository._instance;
  }

  async allUsers(): Promise<IUser[]> {
    return await UserModel.find({});
  }

  async findUser(userId: String): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

  async createUser(user: IUser): Promise<IUser> {
    return await UserModel.create(user);
  }

  async updateUser(id: String, user: IUser): Promise<IUser> {
    return await UserModel.updateOne({ _id: id }, user);
  }

  async deleteUser(userId: String): Promise<boolean> {
    const result = await UserModel.deleteOne(userId);

    return !!result.ok;
  }

  async createSavedPost(userId: String, savedPost: ISavedPost): Promise<IUser> {
    return await UserModel.updateOne(
      { _id: userId },
      { $push: { savedPosts: savedPost } }
    );
  }

  async deleteSavedPost(userId: String, postId: String): Promise<IUser> {
    return await UserModel.updateOne(
      { _id: userId },
      { $pull: { savedPosts: { postId: postId } } }
    );
  }
}

export default UserRepository;
