const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const PORT = 3000;

const app = express();

const mongoURI = 'mongodb://localhost:27017/unit11dev';
mongoose.connect(mongoURI, () => {console.log('Connected to MongoDB')});

//Automatically parse urlencoded body content and form data from incoming requests and place it in req.body
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req,res) => {res.send('Hello World')})

app.get('/snakegame', () => {console.log("HI")})


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});