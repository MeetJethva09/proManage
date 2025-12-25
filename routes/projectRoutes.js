const {addProject , getProjects} = require("../controllers/projectController")
const router = require("express").Router()

router.post("/add-project", addProject);

router.get("/all-project" , getProjects);

module.exports = router;