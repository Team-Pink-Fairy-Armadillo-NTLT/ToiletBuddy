const express = require("express");
const path = require('path');
const webpack = require('../webpack.config')
require('dotenv').config()
var jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


const PORT = 3000;
const app = express();

const googleAuthRouter = require('./routes/googleAuthRouter');
const apiRouter = require('./routes/apiRouter');
const userController = require('./controllers/userController');
const { stat } = require("fs/promises");

app.use(express.json());
app.use(cookieParser())

app.use('/google', googleAuthRouter);
app.use('/api', apiRouter);


app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'))
});

app.get('/logout', userController.logoutUser, (req,res) => {
  console.log('i got the cookie deleted');
  return res.sendStatus(200);
});

app.get('/verifyuser',userController.verifyUser, (req, res) => {
  return res.status(200).json({ result: "ok" });
});

//if (webpack.mode == "production") {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // app.get('/', (req, res) => {
  //   return res.status(200).sendFile(path.join(__dirname, '../index.html'))
  // }) 
//}
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => { console.log(`listening on port ${PORT}...`); });

