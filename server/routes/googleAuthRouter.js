const express = require('express');
const { google } = require('googleapis');
const webpack = require('../../webpack.config')
const url = require('url');

const userController = require('../controllers/userController');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost:3000/google/callback'
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'online',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});

router.get('/auth', (req, res) => {
  //console.log("in google auth")
  //console.log(authorizationUrl)
  //res.writeHead(301, { "Location": authorizationUrl });
  console.log(authorizationUrl);
  return res.redirect(authorizationUrl);
});

router.get('/callback', async (req, res) => {
  // Handle the OAuth 2.0 server response
  const q = url.parse(req.url, true).query;
  // Get access and refresh tokens (if access_type is offline)
  const { tokens } = await oauth2Client.getToken(q.code)
  await oauth2Client.setCredentials(tokens);
  const apiUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
  fetch(apiUrl,
  {
    headers: {
      'Authorization': 'Bearer ' + tokens.access_token
    }
  })
    .then(response => response.json())
    // add data to databse or check databse for data
    // .then(response => console.log(response))
    .then(data => {
      userController.loginUser(data, res)
      res.redirect('/')
    });
});

module.exports = router;