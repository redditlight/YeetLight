var http = require('http');
var express = require("express");
var parser = require("body-parser");
var cors = require('cors')

var app = express();

app.use(cors());

var snoowrap = require('snoowrap');

module.exports = {
  auth: function(req, res) {

    var data = {
      grant_type: 'authorization_code',
      code: req.body.code,
      redirect_uri: 'http://localhost:3000'
    }

    var querystring = require('querystring')
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
    request(options, function (err, resp, body) {
      if (err) {
        console.log('Error :', err)
        return
      }
      console.log(' Body :', body);
      return res.json({ accessToken: JSON.parse(body).access_token });     
    });
  },


  subreddits: function(req, res) { 
    var subreddits = [];
    var options = {
      method: 'get',
      url: 'https://oauth.reddit.com/api/v1/me/karma',
      headers: {
        'User-Agent': 'YeetLight',
        Authorization: `bearer ${req.body.accessToken}`
      }
    }
    const request = require('request');
    request(options, function (err, resp, body) {
      if (err) {
        console.log('Error :', err)
        return
      }
      console.log(' Body :', JSON.parse(body).data);
      JSON.parse(body).data.forEach((x) => {
        subreddits.push(x.sr);
        
      });
        
      
      return res.json({ subreddits: subreddits });     
    });          
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
      console.log(r);
      
      r.getKarma().then(console.log);
      res = r.getKarma();
    });
    return res;
  }
}