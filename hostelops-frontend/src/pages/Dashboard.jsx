import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintCard from "../components/ComplaintCard";
import { getComplaints } from "../api/api";

export default function Dashboard() {

  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem("token");

  async function loadComplaints() {

    try {

      const data = await getComplaints(token);

      if (Array.isArray(data)) {
        setComplaints(data);
      } else {
        console.log(data);
      }

    } catch (err) {
      console.log("Error loading complaints", err);
    }

  }

  useEffect(() => {
    loadComplaints();
  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      {/* MAIN CONTAINER */}

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">

        {/* Complaint Form */}

        <ComplaintForm refresh={loadComplaints} />

        {/* Complaint List */}

        <h2 className="text-2xl font-bold mt-10 mb-6">
          📋 Your Complaints
        </h2>

        <div className="space-y-5">

          {complaints.length === 0 ? (

            <div className="text-gray-400 text-center py-10">
              No complaints submitted yet.
            </div>

          ) : (

            complaints.map((c) => (
              <ComplaintCard key={c._id} complaint={c} />
            ))

          )}

        </div>

      </main>

    </div>

  );

}