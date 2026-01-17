const router = require("express").Router()
const {addTask,getTaskByUsers,getTaskByTaskId , updateTaskByUser , getAllTasks,
        getAllUserTasks ,deleteTaskByTaskId , getAllTasksByProjectId
} = require("../controllers/taskController")
const {permissionsManager} = require("../middlewares/authCheck")

router.post("/add-task" , addTask);

router.get("/gettaskbyid/:id" , getTaskByUsers);

router.get("/taskbytid/:id", getTaskByTaskId);

router.patch("/updatetask/:id" , updateTaskByUser);

router.get("/alltask" , getAllTasks);

router.get("/getallusertask/:id" , getAllUserTasks)

router.delete("/deletetask/:id" , deleteTaskByTaskId);

router.get("/taskbypid/:pid" , getAllTasksByProjectId);

module.exports = router;