import { Document, Schema, model } from 'mongoose';
import { ISavedPost, SavedPostSchema } from './SavedPostModel';

export interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  picture: String;
  savedPosts: ISavedPost[];
  dateCreated: Date;
  dateUpdated: Date;
}

export const UserSchema: Schema = new Schema({
  name: String,
  email: String,
  password: String,
  picture: String,
  savedPosts: [SavedPostSchema],
  dateCreated: Date,
  dateUpdated: Date
});

UserSchema.set('toJSON', { virtuals: true });

export default model<IUser>('User', UserSchema);
