import { Document, Schema, model } from 'mongoose';

export interface IComment extends Document {
  userId: String;
  text: String;
  dateCreated: Date;
  dateUpdated: Date;
}

export const CommentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: String,
  dateCreated: Date,
  dateUpdated: Date
});

CommentSchema.set('toJSON', { virtuals: true });

export default model<IComment>('Comment', CommentSchema);
