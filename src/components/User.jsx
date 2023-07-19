import { useState, useEffect } from "react";

function User({
  user,
  userClicked,
  updateCallBack,
  deleteCallBack,
  todos,
  handleUserClick,
}) {
  const [showOtherData, setShowOtherData] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    const handler = () => {
      setNewUserData({
        name: user.name,
        email: user.email,
        street: user.address.street,
        city: user.address.city,
        zipCode: user.address.zipcode,
      });
    };
    handler();
  }, []);

  const checkTodosStatus = () => {
    const filteredTodos = todos.filter((todo) => todo.userId === user.id);
    for (const todo of filteredTodos) {
      if (todo.completed == false) return false;
    }
    return true;
  };

  return (
    <>
      <div
        className="userBorder"
        style={{
          borderColor: checkTodosStatus() ? "green" : "red",
          backgroundColor: userClicked == user ? "GoldenRod" : "transparent",
        }}
      >
        <p onClick={() => handleUserClick(user)}>ID: {user.id}</p>
        <p>Name:</p>
        <input
          type="text"
          value={newUserData.name}
          onChange={(e) =>
            setNewUserData((prevData) => ({
              ...prevData,
              name: e.target.value,
            }))
          }
        />{" "}
        <br />
        <p>Email:</p>
        <input
          type="text"
          value={newUserData.email}
          onChange={(e) =>
            setNewUserData((prevData) => ({
              ...prevData,
              email: e.target.value,
            }))
          }
        />{" "}
        <br /> <br />
        <button
          onMouseOver={() => setShowOtherData(true)}
          onClick={() => setShowOtherData(false)}
        >
          Other Data
        </button>
        {showOtherData && (
          <>
            <h3>Other Data: </h3>
            Street:{" "}
            <input
              type="text"
              value={newUserData.street}
              onChange={(e) =>
                setNewUserData((prevData) => ({
                  ...prevData,
                  street: e.target.value,
                }))
              }
            />{" "}
            <br />
            City:{" "}
            <input
              type="text"
              value={newUserData.city}
              onChange={(e) =>
                setNewUserData((prevData) => ({
                  ...prevData,
                  city: e.target.value,
                }))
              }
            />{" "}
            <br />
            Zip Code:{" "}
            <input
              type="text"
              value={newUserData.zipCode}
              onChange={(e) =>
                setNewUserData((prevData) => ({
                  ...prevData,
                  zipCode: e.target.value,
                }))
              }
            />{" "}
            <br />
          </>
        )}
        <button onClick={() => updateCallBack(newUserData, user.id)}>
          Update
        </button>
        <button onClick={() => deleteCallBack(user.id)}>Delete</button>
      </div>
      <br />
    </>
  );
}

export default User;
