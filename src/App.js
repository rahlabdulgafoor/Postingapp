import React, { useState } from "react";
import Post from "./components/Post";
import PostForm from "./components/Newpost";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handlePostAdded = () => {
    setRefresh(!refresh); // Trigger UI update
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
       <div className="container-fluid">
    <span className="navbar-brand mb-0 h1">Posting App</span>
  </div>
</nav>
      <Post  />
    </div>
  );
};

export default App;
