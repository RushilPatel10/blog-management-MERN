import { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const createPost = async (post) => {
        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post),
            });
            const data = await response.json();
            setPosts([...posts, data]);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <PostContext.Provider value={{ posts, fetchPosts, createPost }}>
            {children}
        </PostContext.Provider>
    );
}

export const usePost = () => useContext(PostContext);