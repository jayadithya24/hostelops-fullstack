import { useState } from "react";
import { submitComplaint } from "../api/api";

export default function ComplaintForm({ refresh }) {

  const [form, setForm] = useState({
    name: localStorage.getItem("name") || "",
    enrollment: "",
    hostelType: "",
    roomNumber: "",
    course: "",
    branch: "",
    semester: "",
    category: "Electrical",
    description: "",
    priority: "Low"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await submitComplaint(form, token);

    if (res.message) {
      refresh();
    }

    // reset form
    setForm({
      name: localStorage.getItem("name") || "",
      enrollment: "",
      hostelType: "",
      roomNumber: "",
      course: "",
      branch: "",
      semester: "",
      category: "Electrical",
      description: "",
      priority: "Low"
    });

  }

  return (

    <div className="bg-white p-8 rounded-2xl border border-brand-yellow/40 mb-8 shadow-sm">
      <h2 className="text-xl font-bold text-brand-orange mb-6">
        ➕ Submit a Complaint
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          name="name"
          value={form.name}
          readOnly
          className="w-full bg-brand-yellow/10 p-3 rounded-lg cursor-not-allowed border border-brand-yellow/40"
        />

        {/* Enrollment */}
        <input
          name="enrollment"
          value={form.enrollment}
          onChange={handleChange}
          placeholder="Enrollment Number"
          className="w-full bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40"
        />

        {/* Hostel + Room */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="hostelType"
            value={form.hostelType}
            onChange={handleChange}
            className="bg-brand-yellow/10 p-3 rounded-xl border border-brand-yellow/40"
          >
            <option value="">Hostel Type</option>
            <option value="Boys Hostel">Boys Hostel</option>
            <option value="Girls Hostel">Girls Hostel</option>
          </select>
          <input
            type="text"
            name="roomNumber"
            value={form.roomNumber}
            onChange={handleChange}
            placeholder="Room Number"
            className="bg-brand-yellow/10 p-3 rounded-xl border border-brand-yellow/40"
          />
        </div>

        {/* Course Branch Semester */}
        <div className="grid grid-cols-3 gap-3">
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            className="bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40"
          >
            <option value="">Course</option>
            <option>BCA</option>
            <option>BTech</option>
            <option>MCA</option>
            <option>MBA</option>
            <option>BSc</option>
            <option>MSc</option>
            <option>BBA</option>
          </select>

          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40"
          >
            <option value="">Branch</option>
            <option>Computer Science</option>
            <option>Information Science</option>
            <option>AIML</option>
            <option>Mechanical</option>
            <option>Civil</option>
            <option>Electronics</option>
            <option>Electrical</option>
            <option>Data Science</option>
          </select>

          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40"
          >
            <option value="">Semester</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>

        </div>

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40"
        >
          <option>Electrical</option>
          <option>Furniture</option>
          <option>Cleanliness</option>
          <option>Plumbing</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the issue in detail..."
          className="w-full bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40"
        />

        {/* Priority */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/40"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* Submit */}
        <button className="w-full bg-gradient-to-r from-brand-yellow to-brand-orange p-3 rounded-lg font-semibold text-white hover:opacity-90">
          ✈ Submit Complaint
        </button>

      </form>

    </div>

  );

}