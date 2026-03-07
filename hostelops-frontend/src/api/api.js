const API = "https://hostelops-fullstack.onrender.com";

export default API;


/* ================= LOGIN ================= */

export async function loginUser(email, password, role) {

  const res = await fetch(`${API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, role })
  });

  return res.json();
}


/* ================= REGISTER ================= */

export async function registerUser(data) {

  const res = await fetch(`${API}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();

}


/* ================= GET COMPLAINTS ================= */

export async function getComplaints(token) {

  const res = await fetch(`${API}/api/complaints`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });

  return res.json();
}


/* ================= SUBMIT COMPLAINT ================= */

export async function submitComplaint(data, token) {

  const res = await fetch(`${API}/api/complaints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();

}


/* ================= UPDATE STATUS ================= */

export async function updateComplaintStatus(id, status, token) {

  const res = await fetch(`${API}/api/complaints/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  return res.json();

}
export async function deleteComplaint(id, token) {

  const res = await fetch(`${API}/api/complaints/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}