import { useState } from "react";
import { submitComplaint } from "../api/api";

export default function ComplaintForm({refresh}){

  const [form,setForm] = useState({
    name:"",
    enrollment:"",
    course:"",
    branch:"",
    semester:"",
    category:"Electrical",
    description:"",
    priority:"Low"
  });

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value});
  }

  async function handleSubmit(e){

    e.preventDefault();

    await submitComplaint(form);

    refresh();

    setForm({
      name:"",
      enrollment:"",
      course:"",
      branch:"",
      semester:"",
      category:"Electrical",
      description:"",
      priority:"Low"
    });

  }

  return(

    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">

      <h2 className="text-xl font-semibold text-white mb-6">
        ➕ Submit a Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <input
          name="enrollment"
          value={form.enrollment}
          onChange={handleChange}
          placeholder="Enrollment Number"
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <div className="grid grid-cols-3 gap-3">

          <select name="course" onChange={handleChange} className="bg-slate-800 p-3 rounded-lg">
            <option>Course</option>
            <option>BCA</option>
            <option>BTech</option>
            <option>MCA</option>
          </select>

          <select name="branch" onChange={handleChange} className="bg-slate-800 p-3 rounded-lg">
            <option>Branch</option>
            <option>Computer Science</option>
            <option>Information Science</option>
            <option>AIML</option>
            <option>Mechanical</option>
          </select>

          <select name="semester" onChange={handleChange} className="bg-slate-800 p-3 rounded-lg">
            <option>Semester</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>

        </div>

        <select name="category" onChange={handleChange} className="bg-slate-800 p-3 rounded-lg">
          <option>Electrical</option>
          <option>Furniture</option>
          <option>Cleanliness</option>
          <option>Plumbing</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the issue in detail..."
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <select name="priority" onChange={handleChange} className="bg-slate-800 p-3 rounded-lg">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="w-full bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-lg font-semibold">
          ✈ Submit Complaint
        </button>

      </form>

    </div>

  );

}