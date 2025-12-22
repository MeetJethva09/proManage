const router = require("express").Router()
const {addTask,getTaskByUsers,getTaskByTaskId , updateTaskByUser , getAllTasks} = require("../controllers/taskController")

router.post("/add-task" , addTask);

router.get("/gettaskbyid/:id" , getTaskByUsers);

router.get("/taskbytid/:id", getTaskByTaskId);

router.patch("/updatetask/:id" , updateTaskByUser);

router.get("/alltask" , getAllTasks);

module.exports = router;