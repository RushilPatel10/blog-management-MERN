// frontend/src/pages/EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();  // Get the post ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the post data to pre-fill the form
        axios
            .get(`/api/posts/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch(err => console.error('Error fetching post:', err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send updated post data to backend
        axios
            .put(`/api/posts/${id}`, { title, content })
            .then(response => {
                navigate(`/view/${id}`);  // Navigate to the View Post page after successful update
            })
            .catch(err => console.error('Error updating post:', err));
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mt-2">
                    <label className="block">Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border p-2 w-full"
                    ></textarea>
                </div>
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
