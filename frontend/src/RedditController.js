var http = require('http');
var express = require("express");
var parser = require("body-parser");
var cors = require('cors')
var app = express();
app.use(cors());
const request = require('request');
var snoowrap = require('snoowrap');

/*This helper function provides the options for making get requests through reddit's oauth pathway
params:
req = the request -- Always needs an Access Token
url = the url of the reddit api Ex: 'api/v1/me' */

function getHelper(req, url) {
  var options = {
    method: 'get',
    url: 'https://oauth.reddit.com/' + url,
    headers: {
      'User-Agent': 'YeetLight',
      Authorization: `bearer ${req.body.accessToken}`
    }
  }

  return options
}

module.exports = {

  //This authenticates the user -- must call this or else none of the account bound reddit api calls will work
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

    request(options, function (err, resp, body) {
      if (err) {
        console.log('Error :', err)
        return
      }
      console.log(' Body :', body);
      return res.json({ accessToken: JSON.parse(body).access_token });
    });
  },


  /*  RequiredParams: accessToken
      Returns: An Array of subreddits for the authenticated user */
  subreddits: function(req, res) {
    var subreddits = [];
    request(getHelper(req, 'api/v1/me/karma'), function (err, resp, body) {
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

  /*RequiredParams: accessToken, subreddit
    subreddit may either be 'all' or *subredditName*
    Returns: Comment Karma, Link Karma, and Total Karma */
  karma: function(req, res) {

    request(getHelper(req, 'api/v1/me/karma'), function (err, resp, body) {
      if (err) {
        console.log('Error :', err)
        return
      }
      var data = JSON.parse(body).data;

      if (data != undefined) {
        if (req.body.subreddit != 'all') {
          var result = data.filter(x => x.sr === req.body.subreddit);
          karma = result[0].comment_karma + result[0].link_karma;
          return res.json({ comment: result[0].comment_karma, link: result[0].link_karma, total: karma });

        } else { //if all is passed then...

          var comment = 0;
          var link = 0;
          var total = 0;
          data.forEach(element => {
            comment += element.comment_karma;
            link += element.link_karma;
          });
          total = comment + link;

          return res.json({ comment: comment, link: link, total: total});
        }
      }
    });
  },

  //test auth through authcode - may only be used once
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
