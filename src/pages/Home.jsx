import AddTodo from "../components/addTodo";
import Todos from "../components/Todos";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="flex justify-between w-full flex-col-reverse md:flex-row">
      <div className="left-sec md:w-3/4 w-full px-3 my-10">
        {token ? (
          <Todos />
        ) : (
          <div>
            <h1 className="text-3xl font-bold">Welcome to MERN Todo App!</h1>
            <p className="mt-4">Manage your tasks effectively.</p>
          </div>
        )}
      </div>
      {token && <AddTodo />}
    </div>
  );
};

export default Home;
