import { FaBolt, FaBroom, FaChair, FaWrench } from "react-icons/fa";

export default function ComplaintCard({ complaint }) {

  const iconMap = {
    Electrical: <FaBolt />,
    Cleanliness: <FaBroom />,
    Furniture: <FaChair />,
    Plumbing: <FaWrench />
  };

  const statusColor = {
    Pending: "bg-yellow-500/20 text-yellow-400",
    "In Progress": "bg-blue-500/20 text-blue-400",
    Resolved: "bg-green-500/20 text-green-400"
  };

  return (

    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700">

      <div className="flex gap-4 items-start">

        {/* ICON */}

        <div className="w-14 h-14 flex items-center justify-center 
        rounded-xl bg-slate-800 text-cyan-400 text-xl">

          {iconMap[complaint.category] || <FaWrench />}

        </div>

        {/* CONTENT */}

        <div className="flex-1">

          <h3 className="text-cyan-400 font-semibold text-lg">
            {complaint.category}
          </h3>

          <p className="text-gray-300">
            {complaint.description}
          </p>

          <div className="flex items-center gap-3 mt-2">

            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
              {complaint.priority} Priority
            </span>

            <span className="text-gray-400 text-sm">
              {complaint.createdAt
  ? new Date(complaint.createdAt).toLocaleString()
  : "Just now"}
            </span>

          </div>

          {/* STATUS */}

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${statusColor[complaint.status]}`}
          >
            {complaint.status}
          </span>

        </div>

      </div>

    </div>

  );

}