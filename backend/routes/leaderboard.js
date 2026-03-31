import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🏆 Get Top Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ score: -1 })
      .limit(10)
      .select("name score");

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ➕ Update Score
router.post("/update-score", async (req, res) => {
  try {
    const { userId, points } = req.body;

    await User.findByIdAndUpdate(userId, {
      $inc: { score: points }
    });

    res.json({ msg: "Score updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;