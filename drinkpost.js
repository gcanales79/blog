
require('dotenv').config()
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const Fs = require('fs')
const Path = require('path')
const axios = require("axios");

axios({
    "method": "GET",
    "url": "https://the-cocktail-db.p.rapidapi.com/random.php",
    "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    }
})
    .then((response) => {
        console.log(response.data.drinks[0].strDrinkThumb)
        let drinkIngredient = [];
        let drinkMeasure = [];
        let drinkName = response.data.drinks[0].strDrink;
        let drinkPic = response.data.drinks[0].strDrinkThumb;
        let drinkInstructions = response.data.drinks[0].strInstructions;

        for (let i = 1; i < 16; i++) {
            console.log(response.data.drinks[0]["strIngredient" + i])
            if (response.data.drinks[0]["strIngredient" + i] != null && response.data.drinks[0]["strMeasure" + i] != null) {
                drinkIngredient.push((response.data.drinks[0]["strIngredient" + i]) + " - "
                    + response.data.drinks[0]["strMeasure" + i])
            }
            if (response.data.drinks[0]["strIngredient" + i] != null && response.data.drinks[0]["strMeasure" + i] == null) {
                drinkIngredient.push((response.data.drinks[0]["strIngredient" + i]))
            }
            if (i == 15) {
                //console.log(drinkIngredient)
                //console.log(drinkMeasure)
            }

        }
        downloadImage(drinkIngredient, drinkMeasure, drinkName, drinkPic, drinkInstructions)

    })
    .catch((error) => {
        console.log(error)
    })


function postTweet(drinkIngredient, drinkMeasure, drinkName, drinkPic, drinkInstructions,mediaID) {
    tweetStatus = "Here is a drink recipe. The drink is " + drinkName + ". The ingredients are " +
        drinkIngredient.join(" , ") + ". "

    //console.log(tweetStatus)

    const params = {
        tweet_mode: "extended",
        truncated: true,
        status: tweetStatus,
        extended_tweet: {
            full_text: tweetStatus,
        },
        //media_ids:mediaID,




    }
    client.post("statuses/update", params)
        .then((tweet) => {
            //console.log(tweet)
            let tweetID=tweet.id_str
            secondTweet(drinkInstructions,mediaID,tweetID)
        })
        .catch((err) => {
            console.log(err)
        })
}

async function downloadImage(drinkIngredient, drinkMeasure, drinkName, drinkPic, drinkInstructions) {
    let picEnding = "drink." + drinkPic.split(".").pop()
    const url = drinkPic
    const path = Path.resolve(__dirname, '/home/administrador/blog/public/assets/images', picEnding)
    const writer = Fs.createWriteStream(path)

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', function(){
            console.log("Listo")
            mediaTweet(drinkIngredient, drinkMeasure, drinkName, drinkPic, drinkInstructions);
        })
        writer.on('error', reject)
       


    })
}

function mediaTweet(drinkIngredient, drinkMeasure, drinkName, drinkPic, drinkInstructions){
    let data = require('fs').readFileSync("public/assets/images/drink.jpg");

    // Make post request on media endpoint. Pass file data as media parameter
    const params = {
        media:data,
    }
    client.post('media/upload', params)
    .then((tweet) => {
        //console.log(tweet)
        let mediaID=tweet.media_id_string;
        postTweet(drinkIngredient, drinkMeasure, drinkName, drinkPic, drinkInstructions,mediaID)
    })
    .catch((err) => {
        console.log(err)
    })
}


//2nd Tweet to make a Thread

function secondTweet(drinkInstructions,mediaID,tweetID) {
    tweetStatus =  drinkInstructions + " #cockatils #drinks "

    //console.log(tweetStatus)

    const params = {
        tweet_mode: "extended",
        in_reply_to_status_id:tweetID,
        truncated: true,
        status: tweetStatus,
        extended_tweet: {
            full_text: tweetStatus,
        },
        media_ids:mediaID,




    }
    client.post("statuses/update", params)
        .then((tweet) => {
            console.log(tweet)
        })
        .catch((err) => {
            console.log(err)
        })
}