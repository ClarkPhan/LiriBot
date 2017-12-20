// export twitter keys
var twitterKeys = require('./keys.js')

if (process.argv[2]) {
  var command = process.argv[2].toLowerCase()
  var i = 3
  var song = ""
  if (process.argv[3]) {
    song = ""
  } else {
    song = "The Sign Ace of Base"
  }
  while (process.argv[i] !== undefined) {
    song += process.argv[i] + " "
    i++;
  }
}

switch (command) {
  case 'my-tweets':
    displayTweets()
    break
  case 'spotify-this-song':
    searchSong(song)
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
          console.log(tweets[i].created_at + ' ' + tweets[i].text)
        }
      } else {
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at + ' ' + tweets[i].text)
        }
      }
    }
  })
}

function searchSong (song) {
  var Spotify = require('node-spotify-api')

  var spotify = new Spotify({
    id: 'b694be677e3c458b9b1ca394fc95404b',
    secret: 'c80f87cdce354508931da4dc8d50899f'
  })

  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err)
    }
    console.log("Artist: " + data.tracks.items[0].artists[0].name)
    console.log("Track: " + data.tracks.items[0].name)
    console.log("Preview: " + data.tracks.items[0].preview_url)
  })
}
