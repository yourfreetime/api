import UserModel, { IUser } from '../models/UserModel';

class UserRepository {
  async allUser(): Promise<IUser[]> {
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
}

export default UserRepository;
