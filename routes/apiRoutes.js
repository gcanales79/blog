require('dotenv').config()
var db = require("../models");
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment-timezone');

/*const webpush = require("../webpush");*/

let pushSubscription;

module.exports = function (app) {

    app.post("/tweets", (req, res) => {
        //console.log("hola2")
        const params = { count: 3 };
        client.get("/statuses/user_timeline", params)
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
            total_tests:req.body.total_tests,
            total_tests_per1m:req.body.total_tests_per1m,
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
            total_tests:req.body.total_tests,
            total_tests_per1m:req.body.total_tests_per1m,
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
            total_tests:req.body.total_tests,
            total_tests_per1m:req.body.total_tests_per1m,
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
            total_tests:req.body.total_tests,
            total_tests_per1m:req.body.total_tests_per1m,
        }).then((dbSpain) =>
            res.json(dbSpain))
            .catch((err) => {
                console.log(err)
            })
    })

    //See if data exist on the Mexico Database
    app.get("/api/datosMexico/", function (req, res) {
        db.Mexico.findAll({
            order: [['fecha', 'DESC']],
            limit: 1,


        }).then(function (dbMexico) {
            //console.log(dbMexico)
            res.json(dbMexico)
        })
    })

    //See if data exist on the Italy Database
    app.get("/api/datosItaly", function (req, res) {
        //let fecha = moment.unix(req.params.fecha).format("YYYY-MM-DD HH:mm:ss")
        //console.log("La fecha es " + fecha)
        db.Italy.findAll({
            order: [['fecha', 'DESC']],
            limit: 1,

        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //See if data exist on the Poland Database
    app.get("/api/datosPoland/", function (req, res) {
        db.Poland.findAll({
            order: [['fecha', 'DESC']],
            limit: 1,


        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //See if data exist on the Spain Database
    app.get("/api/datosSpain/", function (req, res) {
        db.Spain.findAll({
            order: [['fecha', 'DESC']],
            limit: 1,


        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //Update data that exist on the Spain Database
    app.put("/api/actualizar/datosSpain/:id", function (req, res) {
        db.Spain.update({
            fecha: req.body.fecha,
            total_cases: req.body.total_cases,
            new_cases: req.body.new_cases,
            total_deaths: req.body.total_deaths,
            new_deaths: req.body.new_deaths,
            total_recovered: req.body.total_recovered,
            total_tests:req.body.total_tests,
            total_tests_per1m:req.body.total_tests_per1m,
        }, {
            where: {
                id: req.params.id,
            }
        }
        ).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //Update data that exist on the Mexico Database
    app.put("/api/actualizar/datosMexico/:id", function (req, res) {
        db.Mexico.update({
            fecha: req.body.fecha,
            total_cases: req.body.total_cases,
            new_cases: req.body.new_cases,
            total_deaths: req.body.total_deaths,
            new_deaths: req.body.new_deaths,
            total_recovered: req.body.total_recovered,
            total_tests:req.body.total_tests,
            total_tests_per1m:req.body.total_tests_per1m,
        }, {
            where: {
                id: req.params.id,
            }
        }
        ).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //Update data that exist on the Italy Database
    app.put("/api/actualizar/datosItaly/:id", function (req, res) {
        db.Italy.update({
            fecha: req.body.fecha,
            total_cases: req.body.total_cases,
            new_cases: req.body.new_cases,
            total_deaths: req.body.total_deaths,
            new_deaths: req.body.new_deaths,
            total_recovered: req.body.total_recovered,
            total_tests:req.body.total_tests,
            total_tests_per1m:req.body.total_tests_per1m,
        }, {
            where: {
                id: req.params.id,
            }
        }
        ).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //Update data that exist on the Poland Database
    app.put("/api/actualizar/datosPoland/:id", function (req, res) {
        db.Poland.update({
            fecha: req.body.fecha,
            total_cases: req.body.total_cases,
            new_cases: req.body.new_cases,
            total_deaths: req.body.total_deaths,
            new_deaths: req.body.new_deaths,
            total_recovered: req.body.total_recovered,
            total_tests:req.body.total_tests,
            total_tests_per1m:req.body.total_tests_per1m,
        }, {
            where: {
                id: req.params.id,
            }
        }
        ).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //To obtain all the data after 100th cases
    app.get("/api/todos/datosSpain", function (req, res) {
        db.Spain.findAll({
            order: [['fecha', 'ASC']],


        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //To obtain all the data after 100th cases
    app.get("/api/todos/datosMexico", function (req, res) {
        db.Mexico.findAll({
            order: [['fecha', 'ASC']],


        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //To obtain all the data after 100th cases
    app.get("/api/todos/datosItaly", function (req, res) {
        db.Italy.findAll({
            order: [['fecha', 'ASC']],


        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //To obtain all the data after 100th cases
    app.get("/api/todos/datosPoland", function (req, res) {
        db.Poland.findAll({
            order: [['fecha', 'ASC']],


        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //Get id of certain date Poland Database For Local T=02
    app.get("/api/datosPoland/:date", function (req, res) {
        let fecha = moment.utc(req.params.date + process.env.TIME_API).format("YYYY-MM-DD HH:mm:ss")
        db.Poland.findAll({
            where: {
                fecha: fecha
            }
        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //Get id of certain date Italy Database
    app.get("/api/datosItaly/:date", function (req, res) {
        let fecha = moment.utc(req.params.date + process.env.TIME_API).format("YYYY-MM-DD HH:mm:ss")
        db.Italy.findAll({
            where: {
                fecha: fecha
            }
        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //Get id of certain date Spain Database
    app.get("/api/datosSpain/:date", function (req, res) {
        let fecha = moment.utc(req.params.date + process.env.TIME_API).format("YYYY-MM-DD HH:mm:ss")
        db.Spain.findAll({
            where: {
                fecha: fecha
            }
        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //Get id of certain date Mexico Database
    app.get("/api/datosMexico/:date", function (req, res) {
        let fecha = moment.utc(req.params.date + process.env.TIME_API).format("YYYY-MM-DD HH:mm:ss")
        db.Mexico.findAll({
            where: {
                fecha: fecha
            }
        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    /*
    //Subscription Push
    app.post("/subscription", async (req, res) => {
        //console.log(req.body);
        pushSubscription = req.body;
        //console.log(pushSubscription)
        //console.log(pushSubscription.subscription.endpoint)
        res.status(200).json();

    })

    //New Push Notifications
    app.post("/new-message", async (req, res) => {
        const payload = JSON.stringify({
            title: req.body.title,
            message: req.body.message,
            url:"https://www.bitesoftheworld.mx"
        })
        try {
            await webpush.sendNotification(pushSubscription.subscription, payload);
        }
        catch (error) {
            console.log(error)
        }
        res.status(200).json()
    })
    */






}