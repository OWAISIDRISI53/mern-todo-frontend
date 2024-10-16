import { useState, useContext } from "react";
import userContext from "../context/userContext";
import Toast from "./Toast";

const AddTodo = () => {
  const { todos, setTodos, addTodo, error, setError, showToast, setShowToast } =
    useContext(userContext);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const changeHandler = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await addTodo(todo);
    if (data.success) {
      setTodos([...todos, data.note]);
      setShowToast(true);
      setError("Todos added successfully");
    } else {
      setError("Failed to add todo");
      setShowToast(true);
    }
    setTodo({
      title: "",
      description: "",
      tag: "",
    });
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div className="w-4/5 md:w-1/3 mx-auto bg-white rounded-lg shadow-md p-6 ">
      {showToast && (
        <div className="absolute top-10 left-4 transition duration-300 translate-x-3">
          <Toast type="success" message={error} onClose={() => closeToast()} />
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Add New Todo
      </h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            placeholder="Enter todo title"
            value={todo.title}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            placeholder="Enter todo description"
            name="description"
            value={todo.description}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tag"
          >
            Tag
          </label>
          <input
            type="text"
            id="tag"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            placeholder="Enter a tag (optional)"
            name="tag"
            value={todo.tag}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
