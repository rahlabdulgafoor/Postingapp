import React, { useState, useEffect } from "react";
import axios from "axios";

const PostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

// fetching for knowinggfgd id
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // next post Id
  const getNextPostId = () => {
    if (posts.length === 0) return 1; 
    const maxId = Math.max(...posts.map(post => post.id)); 
    return maxId + 1;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !body) {
      alert("Title and body cannot be empty!");
      return;
    }

    const newPost = { title, body, id: getNextPostId() };

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
      onPostAdded(newPost);
      setTitle(""); 
      setBody(""); 
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Add New Post</h4>
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Post Body"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add New Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
