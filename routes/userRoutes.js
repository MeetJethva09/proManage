const router = require("express").Router()
const {addUser , login , userGetById , logoutAction , getAllUsers
    , updateRole , getLimitedUser
} = require("../controllers/userController")

router.post("/add-user" , addUser);

router.post("/login" , login);

router.get("/getbyid/:id" , userGetById);

router.get("/logout" , logoutAction)

router.get('/getallusers' , getAllUsers);

router.patch("/updaterole/:id" , updateRole)

router.get("/recentuser" , getLimitedUser); 

module.exports = router;