const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const mongoose = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const app = express();

// Socket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: "*" } });


// * Cors
app.use(
  cors({
    origin: "*",
    credentialsL: "*",
  })
);

// * Body Parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));

// * Api routes
app.use(
  "/api/v1",
  (req, res, next) => {
    req.io = io;
    next();
  },
  routes
);

app.get("/", async (req, res) => {
  res.send("check");
  return res.status(200).json({ status: 200, message: "Todo-App" });
});

io.on("connection", (socket) => {
  //when connect
  console.log("New client connected with id: ", socket.id);

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!", socket.id);
  });
});

app.use("*", (req, res) => {
  res.status(404).send("Route not found");
});

let PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on PORT http://localhost:${PORT}`);
});
