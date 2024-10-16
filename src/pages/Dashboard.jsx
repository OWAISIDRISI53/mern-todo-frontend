import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Using useNavigate for redirection

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
        console.log(err);
      }
    };

    fetchUserData();
  }, [token]);

  const handleHomeRedirect = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="h-[89vh] flex flex-col items-center justify-center bg-gray-100">
      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded mt-4 w-3/4 text-center">
          {error}
        </p>
      )}
      {userData ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-3/4 max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {userData.name}!
          </h1>
          <p className="text-gray-600">Your email: {userData.email}</p>
          <button
            onClick={handleHomeRedirect}
            className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="ml-2 text-gray-600 mt-4">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
