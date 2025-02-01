import axios from "axios";
import React, { useEffect, useState } from "react";
import PostForm from "./Newpost";

function Post() {
  const [allPosts, setAllPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setAllPosts(data.slice(0, 20)); 
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setAllPosts(allPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleNewPost = (newPost) => {
    setAllPosts([newPost, ...allPosts]); 
  };

  //  edit modal
  const handleEdit = (post) => {
    setEditingPost(post);
    setEditedTitle(post.title);
    setEditedBody(post.body);
    const modal = new window.bootstrap.Modal(document.getElementById("editPostModal"));
    modal.show();
  };

  const handleSaveEdit = async () => {
    const updatedPost = { ...editingPost, title: editedTitle, body: editedBody };

    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${editingPost.id}`, updatedPost);
      setAllPosts(allPosts.map((post) => (post.id === editingPost.id ? updatedPost : post)));
    } catch (error) {
      console.error("Error updating post:", error);
    }

    const modal = window.bootstrap.Modal.getInstance(document.getElementById("editPostModal"));
    modal.hide();

    setEditingPost(null);
  };

  return (
    <div className="container mt-5">
      <PostForm onPostAdded={handleNewPost} />
      <h2 className="mb-4 mt-4">Post List</h2>

      <div className="row mt-3">
        {allPosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{post.title.length > 20 ? post.title.slice(0, 20) + "..." : post.title}</h5>
                <p className="card-text">{post.body.length > 50 ? post.body.slice(0, 50) + "..." : post.body}</p>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(post.id)}>Delete</button>
                <button className="btn btn-primary" onClick={() => handleEdit(post)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ediyt post modal */}
      <div className="modal fade" id="editPostModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Edit title"
              />
              <textarea
                className="form-control"
                rows="4"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                placeholder="Edit body"
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-success" onClick={handleSaveEdit}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Post;
