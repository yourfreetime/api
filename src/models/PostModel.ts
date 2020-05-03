import { Document, Schema, model } from 'mongoose';
import { IUser } from './UserModel';

export interface IPost extends Document {
  text: String;
  author: IUser;
  dateCreated: Date;
  dateUpdated: Date;
}

export const PostSchema: Schema = new Schema({
  text: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreated: Date,
  dateUpdated: Date
});

PostSchema.set('toJSON', { virtuals: true });

export default model<IPost>('Post', PostSchema);
