require('dotenv').config()
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

getTweet();

function getTweet() {
    const params = {
        count: 1,
        screen_name: "Go2Warsaw"
    };
    client.get("/statuses/user_timeline", params)
        .then((tweet) => {
            //console.log(tweet[0].id_str);
            idTweet=tweet[0].id_str;
            reTweet(idTweet)

        })
        .catch((err) => {
            console.log(err)
        })
}

function reTweet(idTweet) {
    const params = {
        id: idTweet
    }
    client.post("/statuses/retweet", params)
        .then((tweet) => {
            console.log(tweet)

        })
        .catch((err) => {
            console.log(err)
        })
}