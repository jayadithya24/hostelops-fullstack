import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API = "https://hostelops-fullstack.onrender.com";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();
    setLoading(true);

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
        setLoading(false);
        return;
      }

      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (error) {

      console.error("Register Error:", error);
      alert("Server error. Please try again.");

    }

    setLoading(false);
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-800">

        <Link
          to="/"
          className="text-teal-400 hover:text-teal-300 text-sm mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold">
            Hostel<span className="text-teal-400">Ops</span>
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
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 py-3 rounded-lg font-semibold text-black transition flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-70"
          >

            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Registering...
              </>
            ) : (
              "Register"
            )}

          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-teal-400 hover:underline"
          >
            Login here
          </Link>

        </p>

      </div>

    </div>

  );

}