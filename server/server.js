const express = require("express");
const app = express();
const webpack = require('../webpack.config')
const path = require("path");
const {google} = require('googleapis');
const url = require('url');
require("dotenv").config()



app.use(express.json())


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
    //console.log("in google auth")
    //console.log(authorizationUrl)
    //res.writeHead(301, { "Location": authorizationUrl });
    res.redirect(authorizationUrl)
  })

  app.get('/google/callback', async (req, res) => {

    // Handle the OAuth 2.0 server response
    if (req.url.startsWith('/google/callback')) {
  
      let q = url.parse(req.url, true).query;
      //console.log("the code is ", q.code)
  
      // Get access and refresh tokens (if access_type is offline)
      let { tokens } = await oauth2Client.getToken(q.code)
      await oauth2Client.setCredentials(tokens);
      //console.log(tokens)

      //check if in database or add them and then set userID to cookie
    //   res.cookie("accessToken", tokens.access_token)
    //   Session.create({
    //     cookieId: tokens.access_token
    //   })
  
      res.redirect('/')
  
      //const userinfo = google.userinfo('v3');
  
      const apiUrl = "https://www.googleapis.com/oauth2/v2/userinfo"
      fetch(apiUrl,
      {
        headers: {
          'Authorization': 'Bearer ' + tokens.access_token
        }
      })
      .then(response => response.json())
      .then(response => console.log(response))
      //.then(data => res.send(data.name))
      //add data to databse or check databse for data

      //set a cookie with user id to check login status 

      //when they log out delete the cookie
    }
  
  })

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
}) 


if (webpack.mode == "production") {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // app.get('/', (req, res) => {
    //     return res.status(200).sendFile(path.join(__dirname, '../index.html'))
    // }) 
}




app.listen(3000, () => {console.log('listening on port 3000')})

