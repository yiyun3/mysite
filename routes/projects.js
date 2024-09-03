var express = require('express');
var router = express.Router();
const db = require("../model/helper");





//GET all projects
router.get("/", async (req, res) => {
    try {
      const projects = await db(`SELECT * FROM projects ORDER BY id ASC;`);
      res.send(projects);
    } catch (error) {
      console.error("Database query failed:", error); // 输出错误到控制台
      res.status(500).send({ error: "An error occurred while fetching projects" });
    }
  });





module.exports = router;