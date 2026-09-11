import express from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Aditya", role: "Admin" },
  { id: 2, name: "Test User", role: "Member" }
];

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "backend",
    message: "Selfhost backend is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "backend",
    message: "Backend is running",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/users", (req, res) => {
  res.json({ success: true, users });
});

app.post("/api/users", (req, res) => {
  const { name, role = "Member" } = req.body;

  if (!name || !String(name).trim()) {
    return res.status(400).json({
      success: false,
      message: "name is required"
    });
  }

  const user = {
    id: users.length + 1,
    name: String(name).trim(),
    role: String(role || "Member").trim()
  };

  users.push(user);

  res.status(201).json({
    success: true,
    user
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
