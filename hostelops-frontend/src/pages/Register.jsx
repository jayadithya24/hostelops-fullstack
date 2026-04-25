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


    <div className="min-h-screen flex items-center justify-center bg-brand-yellow/10 text-brand-dark px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-brand-yellow/40">
        <Link
          to="/"
          className="text-brand-orange hover:text-brand-dark text-sm mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-brand-dark">
            Hostel<span className="text-brand-orange">Ops</span>
          </h1>
          <div className="w-16 h-1 bg-brand-yellow mx-auto mt-2 rounded"></div>
        </div>
        <h3 className="text-xl font-bold text-center mb-2">Create your account</h3>
        <p className="text-brand-dark/60 text-center mb-6">
          Register to submit and manage complaints
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-lg bg-brand-yellow/10 border border-brand-yellow/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full p-3 rounded-lg bg-brand-yellow/10 border border-brand-yellow/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 rounded-lg bg-brand-yellow/10 border border-brand-yellow/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-orange hover:text-brand-dark"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-yellow to-brand-orange py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-center text-brand-dark/60 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brand-orange hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>

  );

}