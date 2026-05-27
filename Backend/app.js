const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");


require("dotenv").config();

const app = express();

const connectDB = require("./app/config/db");
connectDB();

const socketHandler = require("./app/socket/socket");

const server = http.createServer(app);

const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "*",
        
    }
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./app/router/authRoutes"));
app.use("/api/users", require("./app/router/userRoutes"));
app.use("/api/messages", require("./app/router/messageRoutes"));
app.use("/api/requests", require("./app/router/requestRoutes"));
app.use("/api/conversations", require("./app/router/conversationRoutes"));

app.get("/", (req, res)=>{

    res.send("Server is running");
});

socketHandler(io);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});