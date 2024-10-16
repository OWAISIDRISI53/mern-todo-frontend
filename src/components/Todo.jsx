/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import userContext from "../context/userContext";
import Toast from "./Toast";

const Todo = ({ title, description, tag, id }) => {
  const { editTodo, deleteTodo, showToast, setShowToast, error, setError } =
    useContext(userContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditData] = useState({
    title,
    description,
    tag,
  });

  const handleDelete = async () => {
    const newTodo = await deleteTodo(id);
    if (newTodo.success) {
      setError("Todo deleted successfully");
      setShowToast(true);
    }
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editedData, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    console.log(id);
    const newTodo = await editTodo(editedData, id);
    if (newTodo.success) {
      setShowToast(true);
      setError("Todo edit successfully");
      setIsEditing(false);
    }
  };
  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      {showToast && (
        <div className="absolute top-10 left-4 z-50 transition duration-300 translate-x-3">
          <Toast type="success" message={error} onClose={() => closeToast()} />
        </div>
      )}
      {isEditing ? (
        <>
          <input
            name="title"
            value={editedData.title}
            onChange={handleChange}
          />
          <input
            name="description"
            value={editedData.description}
            onChange={handleChange}
          />
          <input name="tag" value={editedData.tag} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3 className="tracking-widest text-indigo-600 text-xs font-semibold uppercase mb-2">
            {tag}
          </h3>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <p className="font-normal text-gray-700">{description}</p>

          {/* Edit and Delete Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              onClick={() => editHandler()}
            >
              <i className="fas fa-edit mr-2"></i>Edit
            </button>
            <button
              className="text-red-600 hover:text-red-800 transition-colors duration-200"
              onClick={() => handleDelete()}
            >
              <i className="fas fa-trash-alt mr-2"></i>Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
