const express = require("express");
const app = express();
const webpack = require('../webpack.config')
const path = require("path");
const {google} = require('googleapis');
const url = require('url');
require("dotenv").config()
const cookieParser = require('cookie-parser');


const homepageRouter = require('./routes/homepage.js')
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');



app.use(express.json())
app.use(cookieParser())


app.use('/client/',express.static(path.join(__dirname, '../client')));


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET


const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost:3000/google/callback'
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
]

const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'online',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});


app.get('/google/auth', (req, res) => {
    res.redirect(authorizationUrl)
  })

  app.get('/google/callback', async (req, res) => {
    // Handle the OAuth 2.0 server response
      let q = url.parse(req.url, true).query;
      // Get access and refresh tokens (if access_type is offline)
      let { tokens } = await oauth2Client.getToken(q.code)
      await oauth2Client.setCredentials(tokens);
      const apiUrl = "https://www.googleapis.com/oauth2/v2/userinfo"
      fetch(apiUrl,
      {
        headers: {
          'Authorization': 'Bearer ' + tokens.access_token
        }
      })
      .then(response => response.json())
      //add data to database or check database for data
      .then(data => {   
        userController.loginUser(data, res)
        res.redirect('/homepage')
      })
  })

  app.get('/homepage',
   // sessionController.isLoggedIn,
    (req, res) => {
      return res.status(200).sendFile(path.join(__dirname, '../index.html'))
    }) 

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
}) 



//if (webpack.mode == "production") {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // app.get('/', (req, res) => {
    //     return res.status(200).sendFile(path.join(__dirname, '../index.html'))
    // }) 
//}


app.listen(3000, () => {console.log('listening on port 3000')})

