import { createContext, useContext, useState } from 'react';

const PostContext = createContext();
const API_URL = "https://blog-management-mern-backend.onrender.com";

export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/posts`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setError('Error fetching posts');
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (post) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(post),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setPosts([data, ...posts]);
            return { success: true, post: data };
        } catch (error) {
            return { 
                success: false, 
                message: error.message || 'Error creating post'
            };
        }
    };

    const updatePost = async (id, updatedPost) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedPost),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setPosts(posts.map(post => post._id === id ? data : post));
            return { success: true, post: data };
        } catch (error) {
            return { 
                success: false, 
                message: error.message || 'Error updating post'
            };
        }
    };

    const deletePost = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            setPosts(posts.filter(post => post._id !== id));
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.message || 'Error deleting post'
            };
        }
    };

    return (
        <PostContext.Provider value={{ 
            posts, 
            loading, 
            error, 
            fetchPosts, 
            createPost, 
            updatePost, 
            deletePost 
        }}>
            {children}
        </PostContext.Provider>
    );
}

export const usePost = () => useContext(PostContext);