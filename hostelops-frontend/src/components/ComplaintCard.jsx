import { FaBolt, FaBroom, FaChair, FaWrench } from "react-icons/fa";

export default function ComplaintCard({ complaint }) {

  const iconMap = {
    electrical: <FaBolt />,
    cleanliness: <FaBroom />,
    furniture: <FaChair />,
    plumbing: <FaWrench />
  };

  const statusColor = {
    pending: "bg-yellow-500/20 text-yellow-400",
    "in progress": "bg-blue-500/20 text-blue-400",
    resolved: "bg-green-500/20 text-green-400"
  };

  const priorityColor = {
    low: "bg-green-500/20 text-green-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    high: "bg-red-500/20 text-red-400"
  };

  // Normalize values (avoid case mismatch issues)
  const category = complaint.category?.toLowerCase();
  const priority = complaint.priority?.toLowerCase();
  const status = complaint.status?.toLowerCase();

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-cyan-400 hover:shadow-lg transition-all">

      <div className="flex gap-4 items-start">

        {/* ICON */}
        <div className="w-14 h-14 flex items-center justify-center
        rounded-xl bg-slate-800 text-cyan-400 text-xl">
          {iconMap[category] || <FaWrench />}
        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* CATEGORY */}
          <h3 className="text-cyan-400 font-semibold text-lg">
            {complaint.category || "General"}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-gray-300">
            {complaint.description}
          </p>

          <div className="flex items-center gap-3 mt-2">

            {/* PRIORITY */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium 
              ${priorityColor[priority] || "bg-gray-500/20 text-gray-400"}`}
            >
              {complaint.priority || "Unknown"} Priority
            </span>

            {/* DATE */}
            <span className="text-gray-400 text-sm">
              {complaint.createdAt
                ? new Date(complaint.createdAt).toLocaleString()
                : "Just now"}
            </span>

          </div>

          {/* STATUS */}
          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-sm 
            ${statusColor[status] || "bg-gray-500/20 text-gray-400"}`}
          >
            {complaint.status || "Pending"}
          </span>

        </div>

      </div>

    </div>
  );
}