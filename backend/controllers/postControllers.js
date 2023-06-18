import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { userId, name, description, location, photoURL, userPicPath } = req.body;
    const newPost = new Post({
      userId,
      name: user.name,
      description,
      location: user.location,
      photoURL: user.photoURL,
      userPicPath,
      likes: {},
      comments: [],
    })

    await newPost.save();

    const post = await Post.find()
    res.status(201).json(post); 
  }
  catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch(error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ userId: id });

    res.status(200).json(posts);
  } catch(error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch(error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    res.status(200).json(updatedPost);
  } catch(error) {
    res.status(404).json({ success: false, message: error.message });
  }
}