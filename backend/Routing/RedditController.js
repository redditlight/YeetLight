var http = require('http');
var express = require("express");
var parser = require("body-parser");
var cors = require('cors')

var app = express();

app.use(cors());

var snoowrap = require('snoowrap');

module.exports = {
  auth: function(req, response) {

    console.log(req.body.code);

    var data = {
      grant_type: 'authorization_code',
      code: req.body.code,
      redirect_uri: 'http://localhost:3000'
    }

    var querystring = require('querystring')
    console.log(querystring.stringify(data));


    var options = {
      method: 'post',
      body: querystring.stringify(data), // Javascript object
      // json: true, // Use,If you are sending JSON data
      url: 'https://www.reddit.com/api/v1/access_token',
      headers: {
        Authorization: 'Basic TGhJZS1NaUFsQzRlMlE6T1N1dGtEUGkzYUlZaWoyMW1ZTUZuMktldHJJ',
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
    const request = require('request');
    request(options, function (err, res, body) {
      if (err) {
        console.log('Error :', err)
        return
      }
      console.log(' Body :', body);
      return response.json({ accessToken: JSON.parse(body).access_token });     
    });
    // .auth('LhIe-MiAlC4e2Q', 'OSutkDPi3aIYij21mYMFn2KetrI')
  },

  subreddits: function(req, res) {
    const r = new snoowrap({
          userAgent: 'YeetLight',
          clientId: 'LhIe-MiAlC4e2Q',
          clientSecret: 'OSutkDPi3aIYij21mYMFn2KetrI',
          accessToken: req.body.accessToken
        });
    return res;
  },    
  

  test: function(req, res) {
    snoowrap.fromAuthCode({
      code: req.body.code,
      userAgent: 'Reddit Light',
      clientId: 'LhIe-MiAlC4e2Q',
      clientSecret: 'OSutkDPi3aIYij21mYMFn2KetrI',
      redirectUri: 'http://localhost:3000'
    }).then(r => {
      // Now we have a requester that can access reddit through the user's account
      r.getKarma().then(console.log);
      res = r.getKarma();
    });
    return res;
  }
}