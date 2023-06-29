import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import SinglePostWidget from './SinglePostWidget';

const AllUserPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const { _id } = useSelector((state) => state.user || {});
  const token = useSelector((state) => state.token);

  const fetAllPosts = async () => {
    const res = await fetch("http://localhost:5000/api/posts/feed", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  const fetchUserPosts = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/${userId}/posts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data.posts }));
  };

  useEffect(() => {
    if (isProfile) {
      fetchUserPosts();
    } else {
      fetAllPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='all-posts-container'>
      {posts.map(({
        _id,
        description,
        picturePath,
        userId,
        createdAt,
        likes,
        comments,
        user,
        name,
        region,
        city,
        district,
        address,
      }) => {
        console.log("I am getting these:", _id, userId, name); // Check the values being passed to SinglePostWidget
        return (
          <SinglePostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            postUser={user}
            name={name}
            picturePath={picturePath}
            description={description}
            createdAt={createdAt}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
            address={address}
            region={region}
            city={city}
            district={district}
          />
        );
      })}
    </div>
  );
};

export default AllUserPosts;