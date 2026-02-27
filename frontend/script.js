(() => {

  /* =========================
     AUTH + ROLE CHECK
  ========================= */

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // Page protection
  if (window.location.pathname.includes("index") && role === "admin") {
    window.location.href = "admin.html";
    return;
  }

  if (window.location.pathname.includes("admin") && role !== "admin") {
    window.location.href = "index.html";
    return;
  }

  /* =========================
     ELEMENTS
  ========================= */

  const form = document.getElementById("complaintForm");
  const complaintList = document.getElementById("complaintList");
  const statusFilter = document.getElementById("statusFilter");

  /* =========================
     SUBMIT COMPLAINT (Student)
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
        const res = await fetch("http://localhost:5000/api/complaints", {
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
        console.error(error);
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

      let url = "http://localhost:5000/api/complaints";

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

      /* ===== ADMIN STATS ===== */

      if (role === "admin") {

        const total = data.length;
        const pending = data.filter(c => c.status === "Pending").length;
        const progress = data.filter(c => c.status === "In Progress").length;
        const resolved = data.filter(c => c.status === "Resolved").length;

        document.getElementById("totalCount") &&
          (document.getElementById("totalCount").innerText = total);

        document.getElementById("pendingCount") &&
          (document.getElementById("pendingCount").innerText = pending);

        document.getElementById("progressCount") &&
          (document.getElementById("progressCount").innerText = progress);

        document.getElementById("resolvedCount") &&
          (document.getElementById("resolvedCount").innerText = resolved);
      }

      /* ===== RENDER LIST ===== */

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
          <div class="complaint-card">
            <h4>${c.category}</h4>
            <p>${c.description}</p>
            <div class="badge-row">
              <span class="priority">${c.priority}</span>
              ${statusSection}
            </div>
          </div>
        `;
      }).join("");

    } catch (error) {
      console.error(error);
      alert("Failed to load complaints");
    }
  }

  /* =========================
     FILTER
  ========================= */

  window.applyFilter = function () {
    loadComplaints();
  };

  /* =========================
     UPDATE STATUS
  ========================= */

  window.updateStatus = async function (id, status) {

    if (role !== "admin") return;

    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
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
      console.error(error);
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