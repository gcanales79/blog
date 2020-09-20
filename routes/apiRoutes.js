require('dotenv').config()
var db = require("../models");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const clientTwilio = require("twilio")(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;
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
            total_tests: req.body.total_tests,
            total_tests_per1m: req.body.total_tests_per1m,
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
            total_tests: req.body.total_tests,
            total_tests_per1m: req.body.total_tests_per1m,
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
            total_tests: req.body.total_tests,
            total_tests_per1m: req.body.total_tests_per1m,
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
            total_tests: req.body.total_tests,
            total_tests_per1m: req.body.total_tests_per1m,
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
            total_tests: req.body.total_tests,
            total_tests_per1m: req.body.total_tests_per1m,
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
            total_tests: req.body.total_tests,
            total_tests_per1m: req.body.total_tests_per1m,
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
            total_tests: req.body.total_tests,
            total_tests_per1m: req.body.total_tests_per1m,
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
            total_tests: req.body.total_tests,
            total_tests_per1m: req.body.total_tests_per1m,
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

    //To obtain all the data from Mexico after 20th of APril
    app.get("/api/abril/datosMexico", function (req, res) {
        let fechainicial = moment.utc("2020-04-20" + process.env.TIME_API).format("YYYY-MM-DD HH:mm:ss")
        db.Mexico.findAll({
            order: [['fecha', 'ASC']],
            where: {
                fecha: {
                    [Op.gte]: fechainicial,
                }
            }


        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //To obtain all the data from Polandafter 20th of APril
    app.get("/api/abril/datosPoland", function (req, res) {
        let fechainicial = moment.utc("2020-04-20" + process.env.TIME_API).format("YYYY-MM-DD HH:mm:ss")
        db.Poland.findAll({
            order: [['fecha', 'ASC']],
            where: {
                fecha: {
                    [Op.gte]: fechainicial,
                }
            }


        }).then(function (data) {
            //console.log(data)
            res.json(data)
        })
    })

    //To obtain the birthdays of today
    app.get("/api/birthday", function (req, res) {
        let month = moment().month() + 1;
        let day = moment().date();
        console.log(day)
        db.Birthday.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('DAY', Sequelize.col('birthday')), day),
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('birthday')), month),
                ]
            }
        }).then(function (data) {
            res.json(data)
        })
    })

    //Send remind of today's birthday
    app.post("/todaybirthday", function (req, res) {
        let telefonos = [process.env.GUS_PHONE]

        //* Send messages thru SMS
        /*
        for (var i = 0; i < telefonos.length; i++) {
            clientTwilio.messages.create({
                from: process.env.TWILIO_PHONE, // From a valid Twilio number
                body: "Today is the birthday of " + req.body.name + " " + req.body.surname + ".\n" +
                    "The birthday is " + req.body.birthday,
                to: telefonos[i],  // Text this number

            })
                .then(function (message) {
                    console.log("Mensaje de texto: " + message.sid);
                    res.json(message);
                })
                .catch((err) => {
                    res.json(err)
                })
        }*/

        //* Send message thry whatsapp
        for (var i = 0; i < telefonos.length; i++) {
            console.log("whatsapp:" + process.env.TWILIO_PHONE);
            clientTwilio.messages.create({
                from: "whatsapp:" + process.env.TWILIO_PHONE, // From a valid Twilio number,
                body: "Today is the birthday of " + req.body.name + " " + req.body.surname + ".\n\n" +
                    "The birthday is " + req.body.birthday,
                to: "whatsapp:" + telefonos[i],  // Text this number

            })
                .then(function (message) {
                    console.log("Whatsapp:" + message.sid);
                    res.json(message);
                })
                .catch(function (error) {
                    res.json(error)
                });
        }

    })

    //Script 
    var questions = ["Hola, le hablamos del consultorio del Doctor Canales, para confirmar su cita del 15 de Agosto. Para confirmar marque 1 para cambiar su cita marque 0",
        "Despues del tono, diga la fecha en que quiere reagendar su cita",
        "Gracias su cita ha sido confirmada"]

    //Hace la llamada de Twilio

    app.post("/call", function (req, res) {
        let CelaLlamar = process.env.GUS_PHONE;
        //console.log("El cel a llamar es " + CelaLlamar);

        let url = process.env.url3 + "/voice"


        let options = {
            to: CelaLlamar,
            from: process.env.TWILIO_PHONE,
            url: url,
        };

        // Place an outbound call to the user, using the TwiML instructions
        // from the /outbound route
        clientTwilio.calls.create(options,
            function (err, call) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Llamada exitosa SID: " + call.sid)
                    db.Appoitment.update({
                        preguntas_completas: 0,
                        callSID: call.sid,
                    }, {
                        where: {
                            telefono: process.env.GUS_PHONE,
                        }
                    }).then(function (dbResult) {
                        res.json(dbResult)
                        //console.log(dbResult)
                    });
                }
            })

    })



    app.post('/voice', (req, res) => {
        // Use the Twilio Node.js SDK to build an XML response
        //console.log("El response es: " + req.body.CallSid)
        // var celular = request.body.Called;
        let SID = req.body.CallSid;
        //questionIndex = 0;
        //!Revisar se es la primer pregunta del celular
        db.Appoitment.findOne({
            where: {
                callSID: SID,
            },
        }).then(function (results) {
            function respond() {
                res.type('text/xml');
                res.send(twiml.toString());
            }
            //Si pones el res.json ya no puedes mandar el res.type y res.send
            //res.json(results);
            console.log(results.dataValues)
            const twiml = new VoiceResponse();
            questionIndex = results.dataValues.preguntas_completas;
            console.log("El question Index de /voice es " + questionIndex);

            if (questionIndex === 0 || questionIndex === 2) {
                const gather = twiml.gather({
                    numDigits: 1,
                    action: "/gather",
                });
                gather.say({
                    voice: "Polly.Penelope",
                    language: "es-US",
                    prosody: {
                        rate: "85%"
                    }
                }, questions[questionIndex]
                );
                // If the user doesn't enter input, loop
                //twiml.redirect('/voice');
                // Render the response as XML in reply to the webhook request
                respond();
            };
            if (questionIndex === 1) {
                twiml.say({
                    voice: "Polly.Penelope",
                    language: "es-US",
                    prosody: {
                        rate: "85%"
                    }
                }, questions[questionIndex]
                )
                twiml.record({
                    transcribe: true,
                    transcribeCallback: "/grabar",
                    maxLength: 20,
                    action: "/gather"
                });

                respond();


            }
        });

    });

    // Create a route that will handle <Gather> input
    app.post('/gather', (req, res) => {
        // Use the Twilio Node.js SDK to build an XML response
        var twiml = new VoiceResponse();
        const SID = req.body.CallSid;
        const input = req.body.Digits || req.body.RecordingUrl;
        db.Appoitment.findOne({
            where: {
                callSID: SID,
            },
        }).then(function (results) {
            //res.json(results);
            console.log(input)
            let questionIndex = results.preguntas_completas;
            console.log("El question Index de gather es: " + questionIndex);
            logica(questionIndex, input, SID)



            function logica(questionIndex, input, SID) {
                const twiml = new VoiceResponse();
                if (questionIndex === 1) {
                    db.Appoitment.update({
                        preguntas_completas: 2,
                        complete: true,
                    }, {
                        where: {
                            callSID: SID,
                        }
                    }).then((result) => {
                        console.log(result)
                        twiml.redirect('/voice');
                        res.type('text/xml');
                        res.send(twiml.toString())
                    })

                }
                else {
                    switch (input) {
                        case "0":
                            db.Appoitment.update({
                                preguntas_completas: 1,
                                complete: true,
                            }, {
                                where: {
                                    callSID: SID,
                                }
                            }).then((result) => {
                                console.log(result)
                                twiml.redirect('/voice');
                                res.type('text/xml');
                                res.send(twiml.toString())
                            })
                            break;
                        case "1":
                            db.Appoitment.update({
                                preguntas_completas: 2,
                                complete: true,
                            }, {
                                where: {
                                    callSID: SID,
                                }
                            }).then((result) => {
                                console.log(result)
                                twiml.redirect('/voice');
                                res.type('text/xml');
                                res.send(twiml.toString())
                            })
                            break;
                        default:
                            twiml.say({
                                voice: "Polly.Penelope",
                                language: "es-US",
                                prosody: {
                                    rate: "85%"
                                }
                            }, "No es una opcion valida");
                            twiml.redirect('/voice');
                            res.type('text/xml');
                            res.send(twiml.toString());
                            break;

                    }
                }

            }


        });
    });

    app.post("/grabar", (req, res) => {
        console.log(req.body.TranscriptionStatus)
        console.log(req.body.TranscriptionText)

        function tenerStatus() {
            let data = res.json()
            //console.log(data.req.body.TranscriptionStatus)
            //console.log(data.req.body.TranscriptionText)
            return res.status(200).end()
        }


        grabarRespuesta();

        async function grabarRespuesta() {
            const status = await tenerStatus();
            const SID = req.body.CallSid;
            const recording = req.body.RecordingUrl;
            let text="";
            if (req.body.TranscriptionStatus == "completed") {
                text = req.body.TranscriptionText;
            }
            else {
                text = req.body.TranscriptionStatus;
            }
            db.Appoitment.update({
                mensaje: text,
                url: recording,
            }, {
                where: {
                    callSID: SID,
                }
            }).then((result) => {
                console.log(result)

            })
        }

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