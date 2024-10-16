// src/components/Navbar.js
// import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // Make sure you have react-router-dom installed
import userContext from "../context/userContext";

const Navbar = () => {
  const context = useContext(userContext);
  const { logoutHandler, token, setToken } = context;

  const logout = () => {
    logoutHandler();
    setToken(null);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [setToken]);
  return (
    <nav className="bg-gray-900 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">MERN Todo</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          {token && (
            <li>
              <Link to="/dashboard" className="text-white hover:text-gray-200">
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {token ? (
          <li>
            <Link
              to="/login"
              onClick={() => logout()}
              className="text-white hover:text-gray-200"
            >
              Logout
            </Link>
          </li>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="py-2 px-2 font-medium text-gray-300 rounded hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
