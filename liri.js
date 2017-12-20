// export twitter keys
var twitterKeys = require('./keys.js')

if (process.argv[2]) {
  var command = process.argv[2].toLowerCase()
}

switch (command) {
  case 'my-tweets':
    displayTweets()
    break
}

function displayTweets () {
  var Twitter = require('twitter')

  var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
  })

  var params = {screen_name: 'cp17560740'}
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    // If no error, display most recent 20 tweets
    if (!error) {
      if (tweets.length >= 20) {
        for (var i = 0; i < 20; i++) {
          console.log(tweets[i].created_at + " " + tweets[i].text)
        }
      } else {
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at + " " + tweets[i].text)
        }
      }
    }
  })
}
