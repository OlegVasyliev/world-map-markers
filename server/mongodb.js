const mongoose = require('mongoose');
const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const cors = require('cors')
app.use(cors())


const db = mongoose.connection;

const CONNECTION_URL = process.env.MONGODB_URL || "mongodb+srv://oleh123:oleh123@cluster0.cu2jf.mongodb.net/olehdb?retryWrites=true&w=majority";


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.set('useFindAndModify', false);









module.exports = db;