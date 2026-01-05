const router = require("express").Router();
const { createProject, getProjects, updateProject, deleteProject } = require("../controllers/projectController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createProject);
router.get("/", verifyToken, getProjects);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

module.exports = router;
