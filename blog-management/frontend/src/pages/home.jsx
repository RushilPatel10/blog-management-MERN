// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">All Posts</h1>
      <Link to="/create" className="bg-blue-500 text-white p-2 rounded">Create Post</Link>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
