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
