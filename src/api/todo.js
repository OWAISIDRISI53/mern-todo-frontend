const host = "http://localhost:3000/api"
const todoAPI = {
    addTodo: async (formData, token, todos, setTodos) => {
        try {
            const response = await fetch(`${host}/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });
            const data = await response.json();
            if (data && data.success) {
                setTodos([...todos, data.todo]); // assuming 'data.todo' is the new todo item
            }
            return data;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    getTodos: async (setTodos) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${host}/getallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setTodos(data);
            } else {
                console.error("Fetched data is not an array:", data);
                setTodos([]); // Reset to empty array or handle as needed
            }
            return data;
        } catch (err) {
            console.log("error");
            return err;
        }
    },
    deleteTodo: async (id, token, todos, setTodos) => {
        try {
            const response = await fetch(`${host}/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()

            const newTodos = todos.filter(todo => todo._id !== id)
            setTodos(newTodos)
            return data
        } catch (err) {
            console.log(err);
            return err
        }
    },
    editTodo: async (updateData, id, token,) => {
        try {
            const response = await fetch(`${host}/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData)
            })
            const data = await response.json()
            return data
        } catch (err) {
            console.log(err);
            throw new Error("Failed to edit Todo")
        }
    }
}

export default todoAPI