import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getComplaints, updateComplaintStatus, deleteComplaint } from "../api/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import { FaBolt, FaBroom, FaChair, FaWrench, FaEye, FaTrash } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

export default function Admin() {

  const token = localStorage.getItem("token");

  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  async function loadComplaints() {

    const data = await getComplaints(token);

    let filtered = data;

    if (statusFilter !== "All") {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (search) {
      filtered = filtered.filter(c =>
        c.category.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setComplaints(filtered);
  }

  useEffect(() => {
    loadComplaints();
  }, [statusFilter, search]);



  async function changeStatus(id, status) {
    await updateComplaintStatus(id, status, token);
    loadComplaints();
  }



  function handleView(c) {
    alert(
`Category: ${c.category}
Description: ${c.description}
Priority: ${c.priority}
Status: ${c.status}`
    );
  }



  async function handleDelete(id) {

    const confirmDelete = window.confirm("Delete this complaint?");

    if (!confirmDelete) return;

    await deleteComplaint(id, token);

    loadComplaints();
  }



  /* ======================
     STATS
  ====================== */

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const progress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;



  /* ======================
     CATEGORY CHART
  ====================== */

  const categoryMap = {};

  complaints.forEach(c => {
    categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));



  /* ======================
     PRIORITY CHART
  ====================== */

  const priorityMap = { Low: 0, Medium: 0, High: 0 };

  complaints.forEach(c => {
    priorityMap[c.priority]++;
  });

  const priorityData = [
    { name: "Low", value: priorityMap.Low },
    { name: "Medium", value: priorityMap.Medium },
    { name: "High", value: priorityMap.High }
  ];



  const COLORS = ["#06b6d4", "#f59e0b", "#3b82f6", "#10b981"];



  /* ======================
     ICON MAP
  ====================== */

  const iconMap = {
    Electrical: <FaBolt />,
    Cleanliness: <FaBroom />,
    Furniture: <FaChair />,
    Plumbing: <FaWrench />
  };



  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">


        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-2xl shadow-lg">
            <p className="text-sm opacity-80">Total</p>
            <h2 className="text-3xl font-bold">{total}</h2>
            <p className="text-sm opacity-80">All complaints</p>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-2xl shadow-lg">
            <p className="text-sm opacity-80">Pending</p>
            <h2 className="text-3xl font-bold">{pending}</h2>
            <p className="text-sm opacity-80">Awaiting action</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg">
            <p className="text-sm opacity-80">In Progress</p>
            <h2 className="text-3xl font-bold">{progress}</h2>
            <p className="text-sm opacity-80">Being worked on</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg">
            <p className="text-sm opacity-80">Resolved</p>
            <h2 className="text-3xl font-bold">{resolved}</h2>
            <p className="text-sm opacity-80">Completed</p>
          </div>

        </div>



        {/* CHARTS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* CATEGORY */}

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">

            <h3 className="text-xl font-semibold mb-6">
              Complaints by Category
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>



          {/* PRIORITY */}

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">

            <h3 className="text-xl font-semibold mb-6">
              Complaints by Priority
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={priorityData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                <XAxis dataKey="name" stroke="#94a3b8" />

                <YAxis stroke="#94a3b8" />

                <Tooltip />

                <Bar dataKey="value" fill="#3b82f6" radius={[10,10,0,0]} />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>



        {/* SEARCH + FILTER */}

        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-800 p-3 rounded-xl border border-slate-700"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 p-3 rounded-xl border border-slate-700 md:w-48"
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

        </div>



        {/* COMPLAINT LIST */}

        <h2 className="text-2xl font-bold mb-6">
          All Complaints
        </h2>



        <div className="space-y-6">

          {complaints.map(c => (

            <div
              key={c._id}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500 transition"
            >

              <div className="flex flex-col md:flex-row justify-between gap-6">

                {/* LEFT */}

                <div className="flex gap-4">

                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-700 text-cyan-400 text-xl">
                    {iconMap[c.category] || <FaWrench />}
                  </div>

                  <div>

                    <h3 className="text-cyan-400 text-lg font-semibold">
                      {c.category}
                    </h3>

                    <p className="text-gray-300">
                      {c.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2">

                      <span className="px-3 py-1 rounded-full bg-orange-200 text-orange-700 text-sm">
                        {c.priority} Priority
                      </span>

                      <span className="flex items-center gap-1 text-gray-400 text-sm">
                        <FiClock />
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleDateString()
                          : "Just now"}
                      </span>

                      <span className="text-gray-400 text-sm">
                        By: {c.name || "Student"}
                      </span>

                    </div>

                  </div>

                </div>



                {/* RIGHT */}

                <div className="flex flex-col gap-3 md:items-end">

                  <select
                    value={c.status}
                    onChange={(e)=>changeStatus(c._id,e.target.value)}
                    className="bg-slate-700 p-3 rounded-lg w-full md:w-40"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>

                  <div className="flex gap-3">

                    <button
                      onClick={() => handleView(c)}
                      className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <FaEye />
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}