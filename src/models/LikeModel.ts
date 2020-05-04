import { Document, Schema, model } from 'mongoose';

export interface ILike extends Document {
  userId: String;
  date: Date;
}

export const LikeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: Date
});

export default model<ILike>('Like', LikeSchema);
