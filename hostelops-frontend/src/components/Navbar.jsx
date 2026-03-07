import { useNavigate } from "react-router-dom";

export default function Navbar(){

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  function logout(){
    localStorage.clear();
    navigate("/");
  }

  return(

    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="bg-teal-500/20 p-2 rounded-lg text-teal-400 text-xl">
            📋
          </div>

          <h1 className="text-xl font-semibold text-white">
            HostelOps Complaint System
          </h1>

        </div>

        <div className="flex items-center gap-6">

          <span className="text-gray-400">
            {role === "admin" ? "Admin View" : "Student Panel"}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </header>

  );

}