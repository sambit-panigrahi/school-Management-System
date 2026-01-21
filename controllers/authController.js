const User = require("../models/User");

// ADMIN / TEACHER registration remains manual if needed
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const exists = await User.findOne({ username, role });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // STUDENT: Auto-create
    if (role === "student") {
      let student = await User.findOne({ username, role: "student" });

      if (!student) {
        // Create student automatically
        student = new User({ username, password, role: "student" });
        await student.save();
      } else {
        // If exists, check password
        if (student.password !== password) {
          return res.status(401).json({ error: "Wrong password" });
        }
      }

      return res.status(200).json({
        message: "Login successful",
        user: { username: student.username, role: student.role }
      });
    }

    // ADMIN / TEACHER: must exist in DB
    const user = await User.findOne({ username, role });
    if (!user) {
      return res.status(401).json({ error: "Access denied" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Wrong password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
