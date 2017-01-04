import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Post = new Schema({
  post_id: Number,
  title: String,
  writer: String,
  contents : String,
  date: {
    created: { type: Date, default:Date.now},
    edited: { type:Date, default:Date.now}
  },
  is_edited: {type: Boolean, default:false }
})

export default mongoose.model('post', Post);
