import { useState } from "react";
import API from "../api/api";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function handleLogin(e){
    e.preventDefault();

    const res = await fetch(`${API}/api/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });

    const data = await res.json();

    if(data.token){

      localStorage.setItem("token",data.token);
      localStorage.setItem("role",data.role);

      if(data.role === "admin"){
        window.location.href="/admin";
      }else{
        window.location.href="/dashboard";
      }

    }else{
      alert(data.message);
    }

  }

  return(

    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">

      {/* Logo */}
      <h1 className="text-5xl font-extrabold mb-2">
        HostelOps
      </h1>

      <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded mb-10"></div>

      {/* Card */}
      <div className="bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-400 mb-6">
          Sign in to manage hostel complaints
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
          />

          <button
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Sign In
          </button>

        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-teal-400">
            Register here
          </a>
        </p>

      </div>

    </div>

  );
}