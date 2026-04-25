import { useNavigate } from "react-router-dom";

export default function Navbar(){

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  function logout(){
    localStorage.clear();
    navigate("/");
  }

  return(

    <header className="sticky top-0 z-50 bg-white border-b border-brand-yellow">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="bg-brand-yellow/30 p-2 rounded-lg text-brand-orange text-xl">
            📋
          </div>

          <h1 className="text-xl font-semibold text-brand-dark">
            HostelOps Complaint System
          </h1>

        </div>

        <div className="flex items-center gap-6">

          <span className="text-brand-dark/60">
            {role === "admin" ? "Admin View" : "Student Panel"}
          </span>

          <button
            onClick={logout}
            className="bg-brand-orange hover:bg-brand-yellow text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </div>

    </header>

  );

}