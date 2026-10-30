import { useState } from "react";
import API from "../api";

function UserForm({ onUserAdded }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/users", {
                name,
                email,
                age: Number(age)
            });

            onUserAdded(response.data);

            setName("");
            setEmail("");
            setAge("");

        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user");
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />

            <button type="submit">
                Add User
            </button>

        </form>
    );
}

export default UserForm;