/* =========================
   REGISTER
========================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = registerForm.querySelector(".auth-btn");
    button.classList.add("loading");
    button.disabled = true;

    const userData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value.trim()
    };

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      window.location.href = "login.html";

    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    } finally {
      button.classList.remove("loading");
      button.disabled = false;
    }
  });
}


/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = loginForm.querySelector(".auth-btn");
    button.classList.add("loading");
    button.disabled = true;

    const loginData = {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value.trim()
    };

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "index.html";
        }
      }

    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    } finally {
      button.classList.remove("loading");
      button.disabled = false;
    }
  });
}