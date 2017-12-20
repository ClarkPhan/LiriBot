// export twitter keys
var twitterKeys = require('./keys.js')
var command, song, movie = ""

function getUserInputDefault(arr) {
  if (arr[2]) {
    command = arr[2].toLowerCase()
    var i = 3
    song = ""
    if (arr[3]) {
      song = ""
      movie = ""
    } else {
      song = "The Sign Ace of Base"
      movie = "Mr. Nobody"
    }
    while (arr[i] !== undefined) {
      song += arr[i] + " "
      movie += arr[i] + " "
      i++;
    }
  }
}

function getUserInput(arr) {
  if (arr[0]) {
    command = arr[0].toLowerCase()
    var i = 1
    song = ""
    if (arr[1]) {
      song = arr[1]
      movie = arr[1]
    } else {
      song = "The Sign Ace of Base"
      movie = "Mr. Nobody"
    }
  }
}

function liriBotCall() {
  switch (command) {
    case 'my-tweets':
      displayTweets()
      break
    case 'spotify-this-song':
      searchSong(song)
      break
    case 'movie-this':
      searchMovie(movie)
      break
    case 'do-what-it-says':
      readCommands()
      break
  }
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

function searchMovie(movie) {
  var request = require("request");
  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  
  request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var movieInfo = JSON.parse(body)
        console.log("Title: " + movieInfo.Title)
        console.log("Release Year: " + movieInfo.Year)
        console.log("IMDB Rating: " + movieInfo.Ratings[0].Value)
        console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value)
        console.log("Country: " + movieInfo.Country)
        console.log("Plot: " + movieInfo.Plot)
        console.log("Actors: " + movieInfo.Actors)
      }
    });
}

function readCommands() {
  var fs = require('fs')
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error)
    }
    var dataArr = data.split(",")
    getUserInput(dataArr)
    liriBotCall()
  })
}

getUserInputDefault(process.argv)
liriBotCall()