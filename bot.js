var Twit = require('twit');
var request = require("request");

var T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  ''
});


function getTitle(callback){

var idnumber = Math.floor(Math.random() * 11670) + 1;
var url = "http://hummingbird.me/api/v1/anime/" + idnumber;
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var hmResponse = JSON.parse(body);
    console.log("Got a response: ", hmResponse.title);
    callback(hmResponse.title);

  } else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode);
  }
});

}



function makeTweet(message){

var tweet =  message;

console.log(tweet);
T.post('statuses/update', {status: tweet},  function (error, response) {

  if (response) {
console.log('Post Successful!')
                       }

              if (error) {
                    console.log('Error:', error);
                                               			}
                        });

     }

setInterval(function() {
  try {
  var message;
  getTitle(function(title) {
      message = "If you like " + title + " then you might like ";
      console.log(message);

  getTitle(function(title) {
      message = message + title + ".";
      console.log(message);
      makeTweet(message);
  });

  });
   
  }
 catch (e) {
    console.log(e);
  }
},1000 * 15);
