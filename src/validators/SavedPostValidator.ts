import { ForbiddenError } from 'apollo-server';
import UserRepository from '../repositories/UserRepository';

class SavedPostValidator {
  private userRepository: UserRepository = UserRepository.Instance;

  async createSavedPost(_: any, args: any, context: any) {
    const savedPostOld = await this.userRepository.findSavedPost(
      context.user._id,
      args.input.postId
    );

    if (savedPostOld) {
      throw new ForbiddenError('Saved Post already exists');
    }
  }
}

export default SavedPostValidator;
