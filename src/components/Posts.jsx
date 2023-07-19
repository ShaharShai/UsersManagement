import { useState, useEffect } from "react";

function Posts({ userClicked, posts, setPosts }) {
  const [userPosts, setUserPosts] = useState([]);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [newPost, setNewPost] = useState({ Title: "", Body: "" });

  useEffect(() => {
    const hanlder = () => {
      const filteredPosts = posts.filter(
        (posts) => posts.userId === userClicked.id
      );
      setUserPosts(filteredPosts);
    };
    hanlder();
  }, [userClicked, posts, newPost]);

  const addPostHandler = () => {
    if (!newPost.Title || !newPost.Body) {
      alert("Please fill in all required fields.");
      return;
    }

    const postsIds = posts.map((post) => post.id);
    const maxId = Math.max(...postsIds);

    const currentNewPost = {
      userId: userClicked.id,
      id: maxId + 1,
      title: newPost.Title,
      body: newPost.Body,
    };

    setPosts((prevPosts) => [...prevPosts, currentNewPost]);
    setNewPost((newPost.title = ""), (newPost.body = ""));
    setAddButtonClicked(false);
  };

  return (
    <>
      <h3>Posts - User {userClicked.id} : </h3>
      <p>{userClicked.name}</p>
      <button onClick={() => setAddButtonClicked(true)}>Add</button>
      <br />
      <br />

      {addButtonClicked && (
        <>
          <h3>Add a New Post </h3>
          Title:{" "}
          <input
            type="text"
            onInput={(e) => setNewPost({ ...newPost, Title: e.target.value })}
          />{" "}
          <br />
          Body:{" "}
          <input
            type="text"
            onInput={(e) => setNewPost({ ...newPost, Body: e.target.value })}
          />
          <button onClick={() => setAddButtonClicked(false)}>Cancel</button>
          <button onClick={() => addPostHandler()}>Add</button> <br /> <br />
        </>
      )}

      {!addButtonClicked &&
        userPosts.map((post) => {
          return (
            <div key={post.id} className="container-item">
              <b>Title: </b> <p>{post.title}</p>
              <b>Body: </b> <p>{post.body}</p>
            </div>
          );
        })}
    </>
  );
}

export default Posts;
