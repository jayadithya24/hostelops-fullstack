import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

export default function Login() {

  const navigate = useNavigate();

  const [role,setRole] = useState("student");

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value});
  }

  async function handleSubmit(e){

    e.preventDefault();

    const res = await loginUser(form.email,form.password,role);

    if(res.token){

      localStorage.setItem("token",res.token);
      localStorage.setItem("role",res.role);

      if(res.role === "admin"){
        navigate("/admin");
      }else{
        navigate("/dashboard");
      }

    }else{
      alert(res.message);
    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md">

        {/* Logo */}

        <h1 className="text-4xl font-bold text-center mb-8">
          HostelOps
          <div className="w-16 h-1 bg-teal-400 mx-auto mt-2 rounded"></div>
        </h1>

        {/* Card */}

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">

          <h2 className="text-2xl font-semibold mb-2">
            Welcome back
          </h2>

          <p className="text-gray-400 mb-6">
            Sign in to continue to your dashboard
          </p>


          {/* ROLE TOGGLE */}

          <div className="flex bg-slate-800 rounded-xl p-1 mb-6">

            <button
              onClick={()=>setRole("student")}
              className={`flex-1 py-2 rounded-lg ${
                role==="student"
                ? "bg-gradient-to-r from-teal-400 to-blue-500 text-black"
                : "text-gray-400"
              }`}
            >
              🎓 Student
            </button>

            <button
              onClick={()=>setRole("admin")}
              className={`flex-1 py-2 rounded-lg ${
                role==="admin"
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
                className="w-full mt-1 bg-slate-800 p-3 rounded-lg"
              />

            </div>

            <div>

              <label className="text-sm text-gray-400">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-1 bg-slate-800 p-3 rounded-lg"
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 py-3 rounded-lg font-semibold text-black"
            >
              Sign in →
            </button>

          </form>


          {/* REGISTER LINK */}

          <p className="text-center text-gray-400 mt-6">

            Don't have an account?

            <span
              onClick={()=>navigate("/register")}
              className="text-teal-400 ml-2 cursor-pointer"
            >
              Register here
            </span>

          </p>

        </div>

      </div>

    </div>

  );

}