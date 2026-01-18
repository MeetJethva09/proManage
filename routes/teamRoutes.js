const router = require("express").Router()
const {creatingTeam,getTeamsByManagerId} = require("../controllers/teamController")

router.post("/create-team" , creatingTeam);

router.get("/teambymid/:mid",getTeamsByManagerId);

module.exports = router;