import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
