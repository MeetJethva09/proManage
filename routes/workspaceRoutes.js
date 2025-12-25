const {addWorkspace , getAllWorkspaces , limitedWorkspace} = require("../controllers/workspaceController")
const router = require("express").Router()

router.post("/add-workspace" , addWorkspace);

router.get("/allworkspaces" , getAllWorkspaces);

router.get("/limitworkspace" , limitedWorkspace)

module.exports = router;