import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const nav = useNavigate();

    const handleSignup = async () => {
        try {
            await API.post("/user/signup", form);
            nav("/login");
        } catch {
            alert("Signup failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2>Create Account 🚀</h2>
                <p>Join us today</p>

                <input placeholder="Username"
                    onChange={e => setForm({ ...form, username: e.target.value })} />

                <input type="email" placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })} />

                <input type="password" placeholder="Password"
                    onChange={e => setForm({ ...form, password: e.target.value })} />

                <button onClick={handleSignup}>Signup</button>

                <span>
                    Already have an account?{" "}
                    <b onClick={() => nav("/login")}>Login</b>
                </span>

            </div>
        </div>
    );
}