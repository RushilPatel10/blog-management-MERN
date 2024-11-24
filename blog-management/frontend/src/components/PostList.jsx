// frontend/src/components/PostList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = ({ posts }) => {
  const handleDelete = (id) => {
    // Send delete request to the backend
    axios
      .delete(`/api/posts/${id}`)
      .then(response => {
        alert('Post deleted successfully');
        window.location.reload();  // Reload the page to update the list
      })
      .catch(err => console.error('Error deleting post:', err));
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post._id} className="border p-4 mt-2">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <Link to={`/view/${post._id}`} className="text-blue-500">View Post</Link>
          <Link to={`/edit/${post._id}`} className="text-yellow-500 ml-2">Edit Post</Link>
          <button
            onClick={() => handleDelete(post._id)}
            className="text-red-500 ml-2"
          >
            Delete Post
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
