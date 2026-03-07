import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintCard from "../components/ComplaintCard";
import { getComplaints } from "../api/api";
export default function Dashboard() {

  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem("token");
async function loadComplaints() {

  const data = await getComplaints(token);

  if(Array.isArray(data)){
  setComplaints(data);
}else{
  console.log(data);
}
}
  useEffect(() => {
    loadComplaints();
  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <main className="max-w-5xl mx-auto p-6">

        {/* Complaint Form */}

        <ComplaintForm refresh={loadComplaints} />

        {/* Complaint List */}

        <h2 className="text-2xl font-bold mt-8 mb-4">
          📋 Your Complaints
        </h2>

        <div className="space-y-4">

          {complaints.map((c) => (
            <ComplaintCard key={c._id} complaint={c} />
          ))}

        </div>

      </main>

    </div>

  );

}