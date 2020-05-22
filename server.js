require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser")
const exphbs = require('express-handlebars');
var session = require("express-session");
var db = require("./models");
var MemoryStore = require("memorystore")(session)
const webpush=require("web-push")
const morgan=require("morgan")



const app = express();

const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"))

app.use(bodyParser.json());

app.use(express.static("public"));
app.use(cookieParser('secret'));
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
  saveUninitialized: true,
  resave: 'true',
  httpOnly: "true",
  sameSite:"true",
  Secure:"true",
  secret: 'secret'
}));


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: __dirname + "/views/partials"
  })
);
app.set("view engine", "handlebars");

// Routes (Primero se debe poner las api)
//app.use(require("./routes/index"))
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



var syncOptions = { force: false };

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token,");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
// END CORS

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
