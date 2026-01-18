const {addProject , getProjects , getManagerProject ,addMember,getProjectBypid} = require("../controllers/projectController")
const router = require("express").Router()

router.post("/add-project", addProject);

router.get("/all-project" , getProjects);

router.get("/manager-project/:mid" , getManagerProject)

router.post("/add-members/:pid" , addMember)

router.get("/projectbypid/:pid" , getProjectBypid)

module.exports = router;