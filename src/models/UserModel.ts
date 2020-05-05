import { Document, Schema, model } from 'mongoose';
import { ISavedPost, SavedPostSchema } from './SavedPostModel';

export interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  picture: String;
  savedPosts: ISavedPost[];
  location: { type: String; coordinates: Number[] };
  dateCreated: Date;
  dateUpdated: Date;
}

export const UserSchema: Schema = new Schema({
  name: String,
  email: String,
  password: String,
  picture: String,
  savedPosts: [SavedPostSchema],
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: { type: [Number] }
  },
  dateCreated: Date,
  dateUpdated: Date
});

UserSchema.index({ location: '2dsphere' });
UserSchema.set('toJSON', { virtuals: true });

export default model<IUser>('User', UserSchema);
