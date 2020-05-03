import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  picture: String;
  dateCreated: Date;
  dateUpdated: Date;
}

export const UserSchema: Schema = new Schema({
  name: String,
  email: String,
  password: String,
  picture: String,
  dateCreated: Date,
  dateUpdated: Date
});

UserSchema.set('toJSON', { virtuals: true });

export default model<IUser>('User', UserSchema);
