'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js'); // remove .example from /server/config.js.example

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// @TODO: Remove .example from /server/config.js.example
// and update with your proper Auth0 information
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.CLIENT_DOMAIN}/.well-known/jwks.json`
    }),
    // This is the identifier we set when we created the API
    audience: config.AUTH0_AUDIENCE,
    issuer: `https://${config.CLIENT_DOMAIN}/`,
    algorithms: ['RS256']
});

app.get('/api/meetups/public', (req, res) => {
  let publicMeetups = [
  {
    id: 1111,
    name: 'forLoop Lagos',
    host: 'Christian Nwamba',
    attendees: 700
  },
  {
    id: 1112,
    name: 'Laravel Nigeria',
    host: 'Neo Ighodaro',
    attendees: 500
  },
  {
    id: 1113,
    name: 'Angular Nigeria',
    host: 'Prosper Otemuyiwa',
    attendees: 600
  },
  {
    id: 1114,
    name: 'Angular NYC',
    host: 'Kiril C.',
    attendees: 200
  }];

  res.json(publicMeetups);
})

app.get('/api/meetups/private', authCheck, (req,res) => {
  let privateMeetups = [
  {
    id: 2111,
    name: 'FrontStack',
    host: 'Ire Aderinokun',
    attendees: 350
  },
  {
    id: 2112,
    name: 'Codepen Meet',
    host: 'Goodness Kayode',
    attendees: 150
  },
  {
    id: 2113,
    name: 'Startup Aba',
    host: 'Daniel Onwuka',
    attendees: 200
  },
  {
    id: 2114,
    name: 'Usable',
    host: 'Kene Udeze',
    attendees: 222
  }];

  res.json(privateMeetups);
})

app.listen(3333);
console.log('Listening on localhost:3333');