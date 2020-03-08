require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const exphbs  = require('express-handlebars');

const app=express();

const PORT=process.env.PORT || 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main",
      partialsDir:__dirname+"/views/partials"
    })
  );
  app.set("view engine", "handlebars");

  // Routes
require("./routes/htmlRoutes")(app);
//require("./routes/apiRoutes")(app);

app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  module.exports=app;
