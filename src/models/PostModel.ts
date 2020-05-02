import { Document, Schema, model } from 'mongoose';
import { IUser } from './UserModel';

export interface IPost extends Document {
  text: String;
  date: String;
  author: IUser;
  dateCreated: Date;
  dateUpdated: Date;
}

export const PostSchema: Schema = new Schema({
  text: String,
  date: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreated: Date,
  dateUpdated: Date
});

export default model<IPost>('Post', PostSchema);
