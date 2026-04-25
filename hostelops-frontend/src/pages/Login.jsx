import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {

    e.preventDefault();
    setLoading(true);

    try {

      const res = await loginUser(form.email, form.password, role);

      console.log("Login Response:", res); // helpful for debugging

      if (res.token) {

        // Save login data
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        // Save name only if backend sends it
        if (res.name) {
          localStorage.setItem("name", res.name);
        } else {
          // remove wrong value if name not returned
          localStorage.removeItem("name");
        }

        // Redirect based on role
        if (res.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

      } else {
        alert(res.message || "Login failed");
      }

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }

    setLoading(false);
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-brand-yellow/10 text-brand-dark px-4">

      <div className="w-full max-w-md">

        {/* Logo */}

        <h1 className="text-4xl font-bold text-center mb-8">
          Hostel<span className="text-brand-orange">Ops</span>
          <div className="w-16 h-1 bg-brand-yellow mx-auto mt-2 rounded"></div>
        </h1>

        {/* Card */}

        <div className="bg-white p-8 rounded-2xl border border-brand-yellow/40 shadow-xl">

          <Link
            to="/"
            className="text-brand-orange hover:text-brand-yellow text-sm mb-4 inline-block"
          >
            ← Back to Home
          </Link>

          <h2 className="text-2xl font-semibold mb-2 text-center text-brand-dark">
            Welcome back
          </h2>

          <p className="text-brand-dark/60 mb-6 text-center">
            Sign in to continue to your dashboard
          </p>

          {/* ROLE TOGGLE */}

          <div className="flex bg-brand-yellow/20 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2 rounded-lg font-semibold ${
                role === "student"
                  ? "bg-brand-orange text-white shadow"
                  : "text-brand-dark/60"
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 rounded-lg font-semibold ${
                role === "admin"
                  ? "bg-brand-orange text-white shadow"
                  : "text-brand-dark/60"
              }`}
            >
              🛡 Admin
            </button>
          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm text-brand-dark/60">
                Email address
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full mt-1 bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-orange"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* LOGIN BUTTON */}

            <button
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-yellow py-3 rounded-lg font-semibold text-white hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                "Sign in →"
              )}
            </button>

          </form>

          {/* REGISTER LINK */}

          <p className="text-center text-brand-dark/60 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-brand-orange hover:underline"
            >
              Register here
            </Link>
          </p>

        </div>

      </div>

    </div>

  );
}