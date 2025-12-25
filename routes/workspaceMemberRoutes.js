const {addMember , getWokspaceById} = require("../controllers/workspaceMemberController")
const router = require("express").Router()

router.post("/add-member" , addMember);

router.get("/getmembers" , getWokspaceById);

module.exports = router;