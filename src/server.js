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
const wsSocket = SocketIO(server);
server.listen(app.get("port"), ()=> {
    console.log(`listening on http://localhost:${app.get("port")}`);
});

