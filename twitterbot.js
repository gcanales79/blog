require('dotenv').config()
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

searchTweet();

let data = [];

function getTweet() {
    const params = {
        count: 3,
        screen_name: "Go2Warsaw"
    };
    client.get("/statuses/user_timeline", params)
        .then((tweet) => {
            console.log(tweet)

        })
        .catch((err) => {
            console.log(err)
        })
}

function reTweet() {
    const params = {
        id: "1286650529716764673'"
    }
    client.post("/statuses/retweet", params)
        .then((tweet) => {
            console.log(tweet)

        })
        .catch((err) => {
            console.log(err)
        })
}

function searchTweet() {
    const params = {
        q: "travel Warsaw",
        count: 10,
    }
    client.get("search/tweets", params)
        .then((tweet) => {
            //console.log(tweet.statuses)
            for (let i = 0; i < tweet.statuses.length; i++) {
                let element = {}
                element.user = tweet.statuses[i].user.screen_name;
                element.id_str = tweet.statuses[i].id_str;
                element.text = tweet.statuses[i].text;
                data.push(element)
                if (i == tweet.statuses.length - 1) {
                    console.log(data)
                }
            }
            postTweet(data);


        })
        .catch((err) => {
            console.log(err)
        })
}

function postTweet(data) {
    replyArray = ["Do you need any ideas of where to eat today in Warsaw? Follow me " +
        "https://bitesoftheworld.mx/ #foodwarsaw", "Do you have any craving today in Warsaw? Follow me " +
    "https://bitesoftheworld.mx/ #foodwarsaw"]

    for (let i = 0; i < data.length; i++) {
        let tweetStatus;
        let even = i % 2;
        if (even == 0) {
            tweetStatus = "@"+data[i].user + " " + replyArray[0];
            //console.log(tweetStatus);
        }
        else {
            tweetStatus = "@"+data[i].user + " " + replyArray[1];
            //console.log(tweetStatus);

        }

        
        const params = {
            status: tweetStatus,
            in_reply_to_status_id:data[i].id_str,
            auto_populate_reply_metadata:true,


        }
        client.post("statuses/update", params)
            .then((tweet) => {
                console.log(tweet)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
}

