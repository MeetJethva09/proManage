const {addProject , getProjects , getManagerProject ,addMember} = require("../controllers/projectController")
const router = require("express").Router()

router.post("/add-project", addProject);

router.get("/all-project" , getProjects);

router.get("/manager-project/:mid" , getManagerProject)

router.post("/add-members/:pid" , addMember)

module.exports = router;