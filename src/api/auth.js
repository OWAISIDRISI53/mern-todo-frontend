const host = "http://localhost:3000/api"
const authAPI = {
    registerHandler: async (formData) => {
        try {
            const response = await fetch(`${host}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
            return err;
        }
    },

    loginHandler: async (formData, setToken, setError) => {
        try {
            const response = await fetch(`${host}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });
            const data = await response.json();

            if (data.token) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
            }
            if (!data.success) {
                console.log("login failed");
                setError(data.error);
            }
            return data;
        } catch (err) {
            console.log("error", err); //
            return err;
        }
    },
    logoutHandler: (token, setToken, setTodos) => {
        if (!token) {
            return { error: "Logout failed" };
        }
        localStorage.removeItem("token");
        setToken(null);
        setTodos([]);
        console.log("Logged out seccessfully");
        return { success: true, message: "Logged Out Successfully" };
    }
}

export default authAPI