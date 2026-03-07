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

  const token = localStorage.getItem("token");

  const res = await submitComplaint(form, token);

  if(res.message){
    refresh();
  }

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
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <select className="bg-slate-800 p-3 rounded-xl">
    <option>Hostel Type</option>
    <option>Boys Hostel</option>
    <option>Girls Hostel</option>
  </select>

  <input
    type="text"
    placeholder="Room Number"
    className="bg-slate-800 p-3 rounded-xl"
  />

</div>
        <div className="grid grid-cols-3 gap-3">

          <select name="course" onChange={handleChange} className="bg-slate-800 p-3 rounded-lg">
            <option>Course</option>
  <option>BCA</option>
  <option>BTech</option>
  <option>MCA</option>
  <option>MBA</option>
  <option>BSc</option>
  <option>MSc</option>
  <option>BBA</option>
          </select>

          <select name="branch" onChange={handleChange} className="bg-slate-800 p-3 rounded-lg">
             <option>Branch</option>
  <option>Computer Science</option>
  <option>Information Science</option>
  <option>AIML</option>
  <option>Mechanical</option>
  <option>Civil</option>
  <option>Electronics</option>
  <option>Electrical</option>
  <option>Data Science</option>
          </select>

          <select name="semester" onChange={handleChange} className="bg-slate-800 p-3 rounded-lg">
            <option>Semester</option>
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