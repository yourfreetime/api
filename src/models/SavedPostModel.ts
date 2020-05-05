import { Document, Schema, model } from 'mongoose';

export interface ISavedPost extends Document {
  postId: String;
  date: Date;
}

export const SavedPostSchema: Schema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  date: Date
});

export default model<ISavedPost>('SavedPost', SavedPostSchema);
