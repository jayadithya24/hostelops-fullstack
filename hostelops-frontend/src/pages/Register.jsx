import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "https://hostelops-fullstack.onrender.com";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const res = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");

      navigate("/");

    } catch (error) {

      console.error("Register Error:", error);
      alert("Server error. Please try again.");

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl shadow-lg">

        {/* Header */}

        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold">
            HostelOps
          </h1>

          <div className="w-16 h-1 bg-teal-400 mx-auto mt-2"></div>

        </div>

        <h3 className="text-xl font-semibold text-center">
          Create your account
        </h3>

        <p className="text-gray-400 text-center mb-6">
          Register to submit and manage complaints
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-teal-400 hover:underline"
          >
            Login here
          </Link>

        </p>

      </div>

    </div>

  );

}