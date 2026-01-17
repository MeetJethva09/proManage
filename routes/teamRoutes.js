const router = require("express").Router()
const {creatingTeam} = require("../controllers/teamController")

router.post("/create-team" , creatingTeam);

module.exports = router;