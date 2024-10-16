import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import Toast from "../components/Toast";

const Login = () => {
  const { loginHandler, error, setError } = useContext(userContext);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await loginHandler(formData);
    if (result.error) {
      setShowError(true);
      setError(result.error);
      console.log("result", result);
    }
    setFormData({
      email: "",
      password: "",
    });
    if (result.success) {
      navigate("/dashboard");
    }
  };

  const closeToast = () => {
    setShowError(false);
    setError("");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-[89vh]">
      {showError && (
        <div className="absolute top-10 left-4 transition duration-300 translate-x-3">
          <Toast type="error" message={error} onClose={() => closeToast()} />
        </div>
      )}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 md:w-1/3"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeHandler}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            id="password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeHandler}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>

        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
