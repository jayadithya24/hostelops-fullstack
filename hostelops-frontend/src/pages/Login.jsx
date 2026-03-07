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

      if (res.token) {

        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        if (res.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

      } else {
        alert(res.message);
      }

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }

    setLoading(false);
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">

      <div className="w-full max-w-md">

        {/* Logo */}

        <h1 className="text-4xl font-bold text-center mb-8">
          Hostel<span className="text-teal-400">Ops</span>
          <div className="w-16 h-1 bg-teal-400 mx-auto mt-2 rounded"></div>
        </h1>

        {/* Card */}

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">

          <Link
            to="/"
            className="text-teal-400 hover:text-teal-300 text-sm mb-4 inline-block"
          >
            ← Back to Home
          </Link>

          <h2 className="text-2xl font-semibold mb-2 text-center">
            Welcome back
          </h2>

          <p className="text-gray-400 mb-6 text-center">
            Sign in to continue to your dashboard
          </p>

          {/* ROLE TOGGLE */}

          <div className="flex bg-slate-800 rounded-xl p-1 mb-6">

            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-2 rounded-lg ${
                role === "student"
                  ? "bg-gradient-to-r from-teal-400 to-blue-500 text-black"
                  : "text-gray-400"
              }`}
            >
              🎓 Student
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 rounded-lg ${
                role === "admin"
                  ? "bg-gradient-to-r from-teal-400 to-blue-500 text-black"
                  : "text-gray-400"
              }`}
            >
              🛡 Admin
            </button>

          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>

              <label className="text-sm text-gray-400">
                Email address
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full mt-1 bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />

            </div>

            <div className="relative mt-1">

<input
  type={showPassword ? "text" : "password"}
  name="password"
  value={form.password}
  onChange={handleChange}
  placeholder="••••••••"
  className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
/>

<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</button>

</div>

            {/* LOGIN BUTTON */}

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 py-3 rounded-lg font-semibold text-black hover:opacity-90 transition flex items-center justify-center gap-2"
            >

              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                "Sign in →"
              )}

            </button>

          </form>

          {/* REGISTER LINK */}

          <p className="text-center text-gray-400 mt-6">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-teal-400 hover:underline"
            >
              Register here
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}