import { useState } from "react";
import UserContext from "./userContext";
import authAPI from "../api/auth.js";
import todoAPI from "../api/todo.js";

const AuthState = (props) => {
  const [token, setToken] = useState(null);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Register handler
  const registerHandler = async (formData) => {
    return await authAPI.registerHandler(formData);
  };

  //    Login functionally
  const loginHandler = async (formData) => {
    return await authAPI.loginHandler(formData, setToken, setError);
  };

  //  Logout the user
  const logoutHandler = async () => {
    return await authAPI.logoutHandler(token, setToken, setTodos);
  };

  const addTodo = async (formData) => {
    return await todoAPI.addTodo(formData, token, todos, setTodos);
  };

  const getTodos = async () => {
    return await todoAPI.getTodos(setTodos);
  };

  // delete todo
  const deleteTodo = async (id) => {
    return todoAPI.deleteTodo(id, token, todos, setTodos);
  };

  const editTodo = async (updatedData, id) => {
    try {
      const result = await todoAPI.editTodo(updatedData, id, token);
      const updatedTodos = [...todos];
      const todoIndex = updatedTodos.findIndex((todo) => todo._id === id);
      if (todoIndex !== -1) {
        updatedTodos[todoIndex] = {
          ...updatedTodos[todoIndex],
          ...updatedData,
        };
      }
      setTodos(updatedTodos);
      return result;
    } catch (err) {
      console.log("Edit Failed", err);
      return err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        registerHandler,
        loginHandler,
        logoutHandler,
        token,
        setToken,
        todos,
        setTodos,
        addTodo,
        getTodos,
        editTodo,
        deleteTodo,
        error,
        setError,
        showToast,
        setShowToast,
      }}
    >
      {/*  eslint-disable-next-line react/prop-types */}
      {props.children}
    </UserContext.Provider>
  );
};

export default AuthState;
