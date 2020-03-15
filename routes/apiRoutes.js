var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = function (app) {

    app.post("/tweets", (req, res) => {
        //console.log("hola2")
        const params={count:3};
        client.get("/statuses/home_timeline",params)
        .then((tweet)=>{
            //console.log(tweet)
            res.send(tweet)
        })
       

    })

    /*client.get('/statuses/home_timeline', function (error, tweets, response) {
        if (error) throw error;
        //console.log(tweets[0].text);  // The favorites.
        //console.log(tweets[0].entities.urls[0].url)
        //console.log(response);  // Raw response object.
    })*/

    

}