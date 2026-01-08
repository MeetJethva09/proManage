const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const dbConnection = require("./config/dbConnection")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const workspaceRoutes = require("./routes/workspaceRoutes")
const projectRoutes = require("./routes/projectRoutes")
const cookieParser = require("cookie-parser")
//cors setup
app.use(cors({
    origin : process.env.ALLOWED_ORIGIN,
    credentials : true
}))

app.use(cookieParser())

//Parsing json data
app.use(express.json());

app.use("/user" , userRoutes);
app.use("/task" , taskRoutes);
app.use("/workspace",workspaceRoutes);
app.use("/project",projectRoutes);


app.listen(process.env.PORT , (req , res) =>{
    console.info(`Server started on port No : ${process.env.PORT}`);
})