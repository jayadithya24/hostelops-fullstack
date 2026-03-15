require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

/* ===============================
   DATABASE CONNECTION
================================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

/* ===============================
   COMPLAINT MODEL
================================= */

const ComplaintSchema = new mongoose.Schema(
{
  name: { type: String, required: true },

  enrollment: { type: String },
  course: { type: String },
  branch: { type: String },
  semester: { type: String },

  hostelType: { type: String },
  roomNumber: { type: String },

  category: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },

  status: { type: String, default: "Pending" },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

},
{ timestamps: true }
);

const Complaint = mongoose.model("Complaint", ComplaintSchema);

/* ===============================
   AUTH MIDDLEWARE
================================= */

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({ message: "Invalid token" });

  }

};

/* ===============================
   REGISTER ROUTE
================================= */

app.post("/api/register", async (req, res) => {

  try {

    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });

    await user.save();

    res.json({ message: "User Registered Successfully" });

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: "Registration failed" });

  }

});

/* ===============================
   LOGIN ROUTE
================================= */

app.post("/api/login", async (req, res) => {

  try {

    let { email, password, role } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    if (user.role !== role)
      return res.status(403).json({
        message: `This account must login through ${user.role} panel`
      });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
  token,
  role: user.role,
  name: user.name
});

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: "Login failed" });

  }

});

/* ===============================
   SUBMIT COMPLAINT
================================= */

app.post("/api/complaints", authMiddleware, async (req, res) => {

  try {

    const complaint = new Complaint({
      ...req.body,
      userId: req.user.id
    });

    await complaint.save();

    res.json({ message: "Complaint Submitted" });

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: "Failed to submit complaint" });

  }

});

/* ===============================
   GET COMPLAINTS
================================= */

app.get("/api/complaints", authMiddleware, async (req, res) => {

  try {

    const { status } = req.query;

    let filter = {};

    if (req.user.role === "admin") {

      if (status && status !== "All")
        filter.status = status;

      const complaints = await Complaint
        .find(filter)
        .sort({ createdAt: -1 });

      return res.json(complaints);

    } else {

      filter.userId = req.user.id;

      const complaints = await Complaint
        .find(filter)
        .sort({ createdAt: -1 });

      return res.json(complaints);

    }

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: "Failed to fetch complaints" });

  }

});

/* ===============================
   UPDATE STATUS (ADMIN)
================================= */

app.put("/api/complaints/:id", authMiddleware, async (req, res) => {

  try {

    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { status } = req.body;

    await Complaint.findByIdAndUpdate(req.params.id, { status });

    res.json({ message: "Status Updated" });

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: "Failed to update status" });

  }

});

/* ===============================
   DELETE COMPLAINT (ADMIN)
================================= */

app.delete("/api/complaints/:id", authMiddleware, async (req, res) => {

  try {

    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    await Complaint.findByIdAndDelete(req.params.id);

    res.json({ message: "Complaint deleted" });

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: "Delete failed" });

  }

});

/* ===============================
   SERVER
================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);