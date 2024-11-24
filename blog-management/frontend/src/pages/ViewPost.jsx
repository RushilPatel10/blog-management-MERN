// frontend/src/pages/ViewPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewPost = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();  // Get the post ID from the URL

    useEffect(() => {
        // Fetch post data from backend
        axios
            .get(`/api/posts/${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(err => console.error('Error fetching post:', err));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default ViewPost;
