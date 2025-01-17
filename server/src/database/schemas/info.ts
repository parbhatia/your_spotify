import { Schema, Types } from 'mongoose';

export interface Infos {
  owner: Types.ObjectId;
  id: string;
  played_at: Date;
}

export const InfosSchema = new Schema<Infos>(
  {
    owner: { type: Types.ObjectId, ref: 'User' },
    id: String,
    played_at: Date,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

InfosSchema.virtual('track', {
  ref: 'Track',
  localField: 'id',
  foreignField: 'id',
  justOne: true,
});
