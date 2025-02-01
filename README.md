**Overview**
<!-- This is a simple Post Management application built with React that allows users to create, edit, delete, and view posts. The posts are fetched from an external mock API (JSONPlaceholder) and the application allows CRUD operations with a user-friendly interface. -->

**Features**
*Add New Post*: Add new posts with a title and body.
*Edit Post*: Edit the content of an existing post.
*Delete Post*: Remove posts from the list.
*Fetch Posts*: Display a list of posts fetched from the external API.


**Technologies Used**

*React*: JavaScript library for building user interfaces.
*Axios*: Promise-based HTTP client for making requests to the API.
*Bootstrap*: CSS framework for styling the UI.

**How It Works**

*PostForm Component*:
<!-- Allows users to input a title and body to create a new post. -->
<!-- The ID for new posts is calculated based on the highest existing post ID from the fetched data. -->

*Post Component*:
<!-- Displays the list of posts. -->
<!-- Provides functionality to edit and delete posts. When you delete a post, it’s removed from the UI. -->
<!-- Edits are shown in a modal and saved back to the mock API. -->
<!-- Running the Project Locally -->

*Prerequisites*
<!-- Node.js: Make sure you have Node.js installed. -->
<!-- npm or yarn: Node package managers for handling dependencies. -->