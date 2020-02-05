const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const moment = require("moment");

// Idea Service
class IdeaService {
  constructor() {
    this.ideas = [];
  }
}

const app = express(feathers());

// Parse JSON
app.use(express.json());
// Config Socket.io realtime APIs
app.configure(socketio());
// Enable REST services
app.configure(express.rest());
// Register services
app.use("/ideas", new IdeaService());

// new connection to connect to stream channel
app.on("connection", conn => app.channel("stream").join(conn));
// Publish events to stream
app.publish(data => app.channel("stream"));

const PORT = process.env.PORT || 3030;

app
  .listen(PORT)
  .on("listening", () =>
    console.log(`Realtime server running on port ${PORT}`)
  );

app.service("ideas").create({
  text: "Build a cool app",
  tech: "Node.js",
  viewer: "John Doe"
});
