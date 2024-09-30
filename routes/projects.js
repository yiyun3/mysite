var express = require('express');
var router = express.Router();
const db = require("../model/helper");





//GET all projects
router.get("/", async (req, res) => {
  try {
    const result = await db(`SELECT * FROM projects ORDER BY id ASC;`);
    // 假设 db 函数返回的结构是 { data: [...], error: null }
    res.json(result);  // 直接返回 db 函数的结果
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ data: null, error: "An error occurred while fetching projects" });
  }
});





module.exports = router;