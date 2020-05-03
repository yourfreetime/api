import { Document, Schema, model } from 'mongoose';

export interface IFollow extends Document {
  userId: String;
  userFollowId: String;
  date: Date;
}

export const FollowSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userFollowId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: Date
});

FollowSchema.set('toJSON', { virtuals: true });

export default model<IFollow>('Follow', FollowSchema);
