const {addWorkspace , getAllWorkspaces , limitedWorkspace,getWorkspacebyWid
    , getWorkspacebyUserId
} = require("../controllers/workspaceController")

const router = require("express").Router()

router.post("/add-workspace" , addWorkspace);

router.get("/allworkspaces" , getAllWorkspaces);

router.get("/limitworkspace" , limitedWorkspace)

router.get("/workspacebywid/:wid" , getWorkspacebyWid)

router.get("/workspacebyuid/:id" , getWorkspacebyUserId);

module.exports = router;