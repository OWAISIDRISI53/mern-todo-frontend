import { useContext, useEffect } from "react";
import Todo from "./Todo";
import userContext from "../context/userContext";

const Todos = () => {
  const context = useContext(userContext);
  const { todos, getTodos } = context;

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container flex items-center md:flex-row flex-wrap gap-y-7 gap-x-3 justify-center md:justify-normal">
      {todos.length === 0 && <h1>No todo item</h1>}
      {todos.map((todo, index) => {
        return (
          <Todo
            title={todo.title}
            description={todo.description}
            tag={todo.tag}
            key={index}
            id={todo._id}
          />
        );
      })}
    </div>
  );
};

export default Todos;
