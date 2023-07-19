import AddUser from "./AddUser";
import Posts from "./Posts";
import Todos from "./Todos";
import User from "./User";
import { getData } from "./utils";
import { useState, useEffect } from "react";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";

function MainComp() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userClicked, setUserClicked] = useState("");
  const [addUserClicked, setAddUserClicked] = useState(false);
  const [newUser, setNewUser] = useState({ Name: "", Email: "" });

  useEffect(() => {
    const handler = async () => {
      const { data: usersData } = await getData(usersUrl);
      const { data: postsData } = await getData(postsUrl);
      const { data: todosData } = await getData(todosUrl);

      setUsers(usersData);
      setPosts(postsData);
      setTodos(todosData);
    };

    handler();
  }, []);

  const deleteUserHandler = (userId) => {
    setUsers((users) => users.filter((u) => u.id !== userId));
  };

  const updateUserHanlder = (newUser, id) => {
    let userIndex = users.findIndex((u) => u.id === id);
    users[userIndex].name = newUser.name;
    users[userIndex].email = newUser.email;
    users[userIndex].address.street = newUser.street;
    users[userIndex].address.city = newUser.city;
    users[userIndex].address.zipcode = newUser.zipCode;
    console.log(
      users[userIndex].name,
      users[userIndex].email,
      users[userIndex].address.street,
      users[userIndex].address.city,
      users[userIndex].address.zipcode
    );
  };

  const handleAddUserClick = () => {
    setAddUserClicked(true);
    setUserClicked(null);
  };

  const handleUserClick = (user) => {
    setAddUserClicked(false);
    setUserClicked(user);
  };

  const renderUsers = () => {
    var renderUsersData = null;
    if (searchText === "" || searchText === null) {
      renderUsersData = users.map((user) => {
        return (
          <User
            key={user.id}
            user={user}
            userClicked={userClicked}
            deleteCallBack={deleteUserHandler}
            updateCallBack={updateUserHanlder}
            todos={todos}
            handleUserClick={handleUserClick}
          />
        );
      });
    } else {
      renderUsersData = users
        .filter(
          (user) =>
            user.name.toUpperCase().includes(searchText.toUpperCase()) ||
            user.email.toUpperCase().includes(searchText.toUpperCase())
        )
        .map((filteredUser) => {
          return (
            <User
              key={filteredUser.id}
              user={filteredUser}
              userClicked={userClicked}
              deleteCallBack={deleteUserHandler}
              updateCallBack={updateUserHanlder}
              todos={todos}
              handleUserClick={handleUserClick}
            />
          );
        });
    }
    return renderUsersData;
  };

  return (
    <>
      <h2>Users Management</h2>
      <div style={{ display: "flex" }}>
        <div>
          <input
            type="text"
            onInput={(e) => setSearchText(e.target.value)}
            placeholder="Search for Users"
            id="searchInput"
          />{" "}
          <br />
          <br />
          <div className="userScrollDiv">
            <button onClick={() => handleAddUserClick()}>Add User</button>{" "}
            <br /> <br />
            {renderUsers()}
          </div>
        </div>
        {addUserClicked && (
          <>
            <AddUser
              newUser={newUser}
              setNewUser={setNewUser}
              setAddUserClicked={setAddUserClicked}
              users={users}
              setUsers={setUsers}
            />
          </>
        )}
        {userClicked && (
          <div>
            <div className="userTodosSection" style={{ display: "" }}>
              <div className="scrollDiv">
                <Todos
                  userClicked={userClicked}
                  todos={todos}
                  setTodos={setTodos}
                />
              </div>
            </div>{" "}
            <br />
            <div>
              <div className="userTodosSection">
                <div className="scrollDiv">
                  <Posts
                    userClicked={userClicked}
                    posts={posts}
                    setPosts={setPosts}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
    </>
  );
}

export default MainComp;
