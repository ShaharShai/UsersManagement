import { useEffect, useState } from "react";

function Todos({ userClicked, todos, setTodos }) {
  const [userTodos, setUserTodos] = useState([]);
  const [addTodoClicked, setAddTodoClicked] = useState(false);
  const [newTodo, setNewTodo] = useState({});
  const [newTodoTitle, setNewTodoTitle] = useState();

  useEffect(() => {
    const todosOfUser = todos.filter((todo) => {
      return todo.userId === userClicked.id;
    });

    const hanlder = () => {
      setUserTodos(todosOfUser);
    };

    hanlder();
  }, [userClicked, todos, newTodo]);

  const todoClickHanlder = (todo) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          completed: true,
        };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const handler = () => {
      setAddTodoClicked(false);
    };
    handler();
  }, [userClicked]);

  const newTodoHandler = () => {
    const todoIds = todos.map((todo) => todo.id);
    const maxId = Math.max(...todoIds);

    const newTodo = {
      userId: userClicked.id,
      id: maxId + 1,
      title: newTodoTitle,
      completed: false,
    };
    if (!newTodo.title) {
      alert("Please fill in all required fields.");
      return;
    }

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoTitle("");
    setAddTodoClicked(false);
  };

  return (
    <>
      <h3>Todos - User {userClicked.id} : </h3>
      <p>{userClicked.name}</p>
      <button onClick={() => setAddTodoClicked(true)}>Add</button>
      {addTodoClicked && (
        <>
          <h3>Add a New Todo</h3>
          Title:{" "}
          <input type="text" onInput={(e) => setNewTodoTitle(e.target.value)} />
          <button onClick={() => setAddTodoClicked(false)}>Cancel</button>
          <button onClick={() => newTodoHandler()}>Add</button>
        </>
      )}
      {!addTodoClicked &&
        userTodos.map((todo) => {
          return (
            <div key={todo.id} className="container-item">
              <br />
              <b>Title:</b> <p>{todo.title}</p>
              <b>Completed:</b> <p>{todo.completed ? "Yes" : "No"}</p>
              {!todo.completed && (
                <button onClick={() => todoClickHanlder(todo)}>
                  Mark Completed
                </button>
              )}
              <br />
            </div>
          );
        })}
    </>
  );
}

export default Todos;
