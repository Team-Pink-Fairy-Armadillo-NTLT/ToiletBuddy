const express = require("express");
const path = require('path');
const webpack = require('../webpack.config')
require('dotenv').config();

const PORT = 3000;
const app = express();

const googleAuthRouter = require('./routes/googleAuthRouter');
const bathroomRouter = require('./routes/apiRouter');

const apiRouter = require('./routes/apiRouter');

app.use(express.json());

app.use('/google', googleAuthRouter);
app.use('/api', apiRouter);

// for now, for testing redirects
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'))
}) 

app.use('/bathroom', apiRouter) 

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
  res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => { console.log(`listening on port ${PORT}...`); });

