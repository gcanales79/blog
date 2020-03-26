var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var db = require("../models");

module.exports = function (app) {

    app.post("/tweets", (req, res) => {
        //console.log("hola2")
        const params = { count: 3 };
        client.get("/statuses/home_timeline", params)
            .then((tweet) => {
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

    //Post values on the Database Poland
    app.post("/datosPoland", (req, res) => {
        db.Poland.create({
            fecha: req.body.fecha,
            total_cases: req.body.total_cases,
            new_cases: req.body.new_cases,
            total_deaths: req.body.total_deaths,
            new_deaths: req.body.new_deaths,
            total_recovered: req.body.total_recovered,
        }).then((dbPoland) =>
            res.json(dbPoland))
            .catch((err) => {
                console.log(err)
            })
    })

    //Post values on the Database Italy
    app.post("/datosItaly", (req, res) => {
        db.Italy.create({
            fecha: req.body.fecha,
            total_cases: req.body.total_cases,
            new_cases: req.body.new_cases,
            total_deaths: req.body.total_deaths,
            new_deaths: req.body.new_deaths,
            total_recovered: req.body.total_recovered,
        }).then((dbItaly) =>
            res.json(dbItaly))
            .catch((err) => {
                console.log(err)
            })
    })

    //Post values on the Database Mexico
    app.post("/datosMexico", (req, res) => {
        db.Mexico.create({
            fecha: req.body.fecha,
            total_cases: req.body.total_cases,
            new_cases: req.body.new_cases,
            total_deaths: req.body.total_deaths,
            new_deaths: req.body.new_deaths,
            total_recovered: req.body.total_recovered,
        }).then((dbMexico) =>
            res.json(dbMexico))
            .catch((err) => {
                console.log(err)
            })
    })

    //Post values on the Database Spain
    app.post("/datosSpain", (req, res) => {
        db.Spain.create({
            fecha: req.body.fecha,
            total_cases: req.body.total_cases,
            new_cases: req.body.new_cases,
            total_deaths: req.body.total_deaths,
            new_deaths: req.body.new_deaths,
            total_recovered: req.body.total_recovered,
        }).then((dbSpain) =>
            res.json(dbSpain))
            .catch((err) => {
                console.log(err)
            })
    })



}