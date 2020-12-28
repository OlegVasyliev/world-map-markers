const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server, {
 cors: {
  origin: "https://world-map-markers.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
 }})


const dotenv = require('dotenv').config()
const db = require('./mongodb')
const locModel = require("./model/locations.js")

app.use(cors())

const PORT = process.env.PORT || 5000


app.get('/', async (req, res ) => {
 const locations = await locModel.find();
 res.json(locations)
})


initSocket();

function initSocket () {
 io.on('connection', async socket => {
  const locations = await locModel.find();
  socket.emit("marker", locations);
  initStream(socket);
 })
}

function initStream(socket) {
 locModel.watch().on('change', async data => {
  console.log(data)

  const locations = await locModel.find();
  socket.emit("marker", locations);
 })
}

server.listen(PORT, () => console.log(`Server is running on ${PORT} port`))

