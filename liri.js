var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require('spotify');
var request = require('request');


//Twitter

var getTweets = function() {

    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: 'johntg5_wake' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(" ");
                console.log(tweets[i].text);
            }

        }
    });
}


//Spotify

var getArtistName = function(artist) {
    return artist.name;
}

var getSpotify = function(songName) {

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }

        var song = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s):' + songs[i].artists.map(getArtistName));
            console.log("song name: " + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('-----------------------------------');
        }
    });

}
//OMDB



var getMovie = function(movieName) {

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var jsonData = JSON.parse(body);

            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
        }
    });

}

var doWhatItSays = function() {
        fs.readFile('random.txt', "utf-8", function(err, data) {
            if (err) throw err;


            var dataArr = data.split(",");
            if (dataArr.length === 2) {
                pick(dataArr[0], dataArr[1]);
            }
            else if (dataArr.length === 1) {
                pick(dataArr[0]);
            }

        });

        var pick = function(caseData, functionData) {
            switch (caseData) {
                case 'my-tweets':
                    getTweets();
                    break;
                case 'spotify-this-song':
                    getSpotify(functionData);
                case 'movie-this':
                    getMovie(functionData);
                case 'do-what-it-says':
                    doWhatItSays();
                    break;
                default:
                    console.log("Please enter a correct command");
            }
        }

        var runThis = function(argOne, argTwo) {
            pick(argOne, argTwo);
        };

        runThis(process.argv[2], process.argv[3]);
