(() => {

  /* =========================
     API BASE URL
  ========================= */

  const API_BASE =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://hostelops-fullstack.onrender.com";


  /* =========================
     AUTH + ROLE CHECK
  ========================= */

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  if (window.location.pathname.includes("admin") && role !== "admin") {
    window.location.href = "index.html";
    return;
  }

  if (window.location.pathname.includes("index") && role === "admin") {
    window.location.href = "admin.html";
    return;
  }

  document.body.style.display = "block";


  /* =========================
     ELEMENTS
  ========================= */

  const form = document.getElementById("complaintForm");
  const complaintList = document.getElementById("complaintList");
  const statusFilter = document.getElementById("statusFilter");


  /* =========================
     ICON HELPER
  ========================= */

  function getIcon(category) {
    if (category === "Electrical") return "⚡";
    if (category === "Cleanliness") return "✨";
    if (category === "Furniture") return "🪑";
    if (category === "Plumbing") return "🚿";
    return "📋";
  }

  function timeAgo(date) {

    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const hours = Math.floor(seconds / 3600);

    if (hours < 1) return "just now";

    if (hours === 1) return "about 1 hour ago";

    return `about ${hours} hours ago`;
  }


  /* =========================
     SUBMIT COMPLAINT
  ========================= */

  if (form && role === "student") {

    form.addEventListener("submit", async (e) => {

      e.preventDefault();

      const complaint = {
        name: document.getElementById("name")?.value,
        category: document.getElementById("category")?.value,
        description: document.getElementById("description")?.value,
        priority: document.getElementById("priority")?.value
      };

      try {

        const res = await fetch(`${API_BASE}/api/complaints`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(complaint)
        });

        if (res.status === 401) {
          alert("Session expired. Please login again.");
          logout();
          return;
        }

        const data = await res.json();

        alert(data.message);

        form.reset();

        loadComplaints();

      } catch (error) {

        console.error("Submit Complaint Error:", error);
        alert("Failed to submit complaint");

      }

    });

  }


  /* =========================
     LOAD COMPLAINTS
  ========================= */

  async function loadComplaints() {

    if (!complaintList) return;

    try {

      let url = `${API_BASE}/api/complaints`;

      if (role === "admin" && statusFilter) {

        const selectedStatus = statusFilter.value;

        if (selectedStatus && selectedStatus !== "All") {
          url += `?status=${selectedStatus}`;
        }

      }

      const res = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        logout();
        return;
      }

      const data = await res.json();


      /* =========================
         ADMIN DASHBOARD STATS
      ========================= */

      if (role === "admin") {

        const total = data.length;
        const pending = data.filter(c => c.status === "Pending").length;
        const progress = data.filter(c => c.status === "In Progress").length;
        const resolved = data.filter(c => c.status === "Resolved").length;

        if (document.getElementById("totalCount"))
          document.getElementById("totalCount").innerText = total;

        if (document.getElementById("pendingCount"))
          document.getElementById("pendingCount").innerText = pending;

        if (document.getElementById("progressCount"))
          document.getElementById("progressCount").innerText = progress;

        if (document.getElementById("resolvedCount"))
          document.getElementById("resolvedCount").innerText = resolved;
      }


      /* =========================
         RENDER COMPLAINT LIST
      ========================= */

      complaintList.innerHTML = data.map(c => {

        const statusSection = role === "admin"
          ? `
          <select onchange="updateStatus('${c._id}', this.value)">
            <option ${c.status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
          </select>
          `
          : `<span class="status-badge">${c.status}</span>`;

        return `

        <div class="complaint-card-modern">

          <div class="complaint-header">

            <div class="icon-box">
              ${getIcon(c.category)}
            </div>

            <div class="complaint-info">

              <h3 class="complaint-category">
                ${c.category}
              </h3>

              <p class="complaint-desc">
                ${c.description}
              </p>

              <div class="complaint-meta">

                <span class="priority-badge ${c.priority.toLowerCase()}">
                  ${c.priority} Priority
                </span>

                <span class="time">
                  ⏱ ${timeAgo(c.createdAt)}
                </span>

              </div>

            </div>

          </div>

          <div class="status-row">
            ${statusSection}
          </div>

        </div>

        `;

      }).join("");

    } catch (error) {

      console.error("Load Complaints Error:", error);
      alert("Failed to load complaints");

    }
  }


  /* =========================
     FILTER (ADMIN)
  ========================= */

  window.applyFilter = function () {
    loadComplaints();
  };


  /* =========================
     UPDATE STATUS (ADMIN)
  ========================= */

  window.updateStatus = async function (id, status) {

    if (role !== "admin") return;

    try {

      const res = await fetch(`${API_BASE}/api/complaints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        logout();
        return;
      }

      loadComplaints();

    } catch (error) {

      console.error("Update Status Error:", error);
      alert("Failed to update status");

    }
  };


  /* =========================
     LOGOUT
  ========================= */

  window.logout = function () {

    localStorage.clear();

    window.location.href = "login.html";

  };


  /* =========================
     INITIAL LOAD
  ========================= */

  loadComplaints();

})();