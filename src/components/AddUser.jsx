function AddUser({ newUser, setNewUser, setAddUserClicked, users, setUsers }) {
  const newUserHandler = () => {
    if (!newUser.Name || !newUser.Email) {
      alert("Please fill in all required fields.");
      return;
    }

    const usersIds = users.map((user) => user.id);
    const maxId = Math.max(...usersIds);

    const currentNewUser = {
      id: maxId + 1,
      name: newUser.Name,
      userName: newUser.Name,
      email: newUser.Email,
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "-",
          lng: "",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    };

    setUsers((prevUsers) => [...prevUsers, currentNewUser]);
    setNewUser((newUser.Name = ""), (newUser.Email = ""));
    setAddUserClicked(false);
  };

  return (
    <>
      <div id="addUserSection">
        <h3>Add New User</h3>
        Name:{" "}
        <input
          type="text"
          onInput={(e) => setNewUser({ ...newUser, Name: e.target.value })}
          required="required"
        />{" "}
        <br />
        Email:{" "}
        <input
          type="email"
          onInput={(e) => setNewUser({ ...newUser, Email: e.target.value })}
          required="required"
        />{" "}
        <br /> <br />
        <button onClick={() => setAddUserClicked(false)}>Cancel</button>
        <button onClick={() => newUserHandler()}>Add</button>
      </div>
    </>
  );
}

export default AddUser;
