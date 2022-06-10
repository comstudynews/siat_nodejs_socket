import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
app.set("port", 3000);
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res)=>res.render("home"))
app.get("/*", (req, res)=> res.redirect("/"));

const server = http.createServer(app);
const wsServer = SocketIO(server);
server.listen(app.get("port"), ()=> {
    console.log(`listening on http://localhost:${app.get("port")}`);
});

wsServer.on("connection", (socket)=> {
    socket.on("join_room", (roomName, done)=>{
        socket.join(roomName);
        // done();
        socket.to(roomName).emit("welcome");
    });
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });
    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
    });
});