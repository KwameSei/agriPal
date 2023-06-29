import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
{
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  description: String,
  location: String,
  photoURL: String,
  userPicPath: String,
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: [],
  },
}, 
{
  timestamps: true,
}
);

const Post = mongoose.model('Post', PostSchema);

export default Post;