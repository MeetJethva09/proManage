const router = require("express").Router()
const {addUser , login , userGetById , logoutAction , getAllUsers
    , updateRole , getLimitedUser , generateOtp , loginWithOtp , getManagers ,getMembers
} = require("../controllers/userController")
const {verifyToken , permissionsManager} = require("../middlewares/authCheck")

router.post("/add-user" , addUser);

router.post("/login" , login);

router.get("/getbyid/:id" , userGetById); 

router.get("/logout" , logoutAction)

router.get('/getallusers' , getAllUsers);

router.patch("/updaterole/:id"  , updateRole)

router.get("/recentuser" , getLimitedUser); 

router.post("/validate-user" , generateOtp)

router.post("/validate-otp" , loginWithOtp)

router.get("/managers" , getManagers);

router.get("/members" , getMembers);


module.exports = router;