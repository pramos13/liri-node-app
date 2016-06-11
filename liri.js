//VARIABLES
var keys = require("./keys.js"); //GRABS HIDDEN KEYS
var Twitter = require('twitter'); //NODE TWITTER PACKAGE
var spotify = require("spotify"); //NODE SPOTIFY PACKAGE
var fs = require("fs"); //USED TO READ random.txt FILE
var request = require('request'); //USED TO CALL OMDB SITE 
var params = process.argv.slice(2); //USE TO IGNORE FIRST TWO ARGV 




//SWITCH CASE 
switch (params[0]) {
    case "my-tweets":
        myTweets(); 
        break;
    case "spotify-this-song":
        if (params[1]) {
            spotifyIt();
        } else {
            spotifyIt(params[1] = "Whats my age again");
        }
        break;
    case "movie-this":
        if (params[1]) {
            findMovie();
        } else {
            findMovie(params[1] = "Mr. Nobody");
        }
        break;
    case "do-what-it-says":
        readFillCall(params[1]);
        break;


}
//myTweets FUNCTION

function myTweets() {

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });


    client.get('statuses/user_timeline', { screen_name: 'Swolebuddy', count: 20 }, function(error, data, response) {
        if (error) throw error;
        for (var i = 0; i < data.length; i++) {

            var tweetResults = data[i].text + "\n"; 
            console.log(tweetResults);

        };
    });
}


//SPOTIFY FUNCTION

function spotifyIt() {
    spotify.search({ type: 'track', query: params[1] }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return; 
        } else {
            var songInfo = data.tracks.items[0];
            console.log("artist name", songInfo.artists[0].name);
            console.log("song name", songInfo.name);
            console.log("album name", songInfo.album.name);
            console.log("preview link", songInfo.preview_url);

        };
    });
}
spotifyIt();


//MOVIE FUNCTION
function findMovie() {
  request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&r=json", function(error, response, body){
    var movieObject = JSON.parse(body);
    console.log("the title is", movieObject.Title);
    console.log("the year is", movieObject.Year);
    console.log("the IMDB Rating is", movieObject.imdbRating);
    console.log("the country is", movieObject.Country);
    console.log("the language is", movieObject.Language);
    console.log("the plot is", movieObject.Plot);
    console.log("the actors are", movieObject.Actors);
  });
};





function readFillCall() {
  fs.readFile("random.txt", "utf-8", function(err, data){
    data.split(',');
    spotifyIt(data[1]);
  });
};