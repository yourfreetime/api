import { Document, Schema, model } from 'mongoose';
import { IUser } from './UserModel';
import { ILike, LikeSchema } from './LikeModel';
import { IComment, CommentSchema } from './CommentModel';

export interface IPost extends Document {
  text: String;
  author: IUser;
  likes: ILike[];
  comments: IComment[];
  dateCreated: Date;
  dateUpdated: Date;
}

export const PostSchema: Schema = new Schema({
  text: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [LikeSchema],
  comments: [CommentSchema],
  dateCreated: Date,
  dateUpdated: Date
});

PostSchema.set('toJSON', { virtuals: true });

export default model<IPost>('Post', PostSchema);
