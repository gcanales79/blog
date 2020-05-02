module.exports = function (app) {


    // Load index page
    app.get("/", function (req, res) {
        res.render("index", {
            msg: "Welcome!",
        });

    });

    // Load comming soon page
    app.get("/coming-soon", function (req, res) {
        res.render("coming", {
            msg: "Welcome!",
        });

    });

    // Load Trattoria Da Antonio
    app.get("/trattoria-da-antonio", function (req, res) {
        res.render("daAntonio", {
            msg: "Welcome!",
        });

    });

    // Load Coronavirus
    app.get("/coronavirus", function (req, res) {
        res.render("coronavirus", {
            msg: "Welcome!",
        });

    });

    // Load Data Coronavirus
    app.get("/data-coronavirus-poland-and-mexico", function (req, res) {
        res.render("datacorona", {
            msg: "Welcome!",
        });

    });

     // Load Grill Part 1
     app.get("/steak-at-poland", function (req, res) {
        res.render("steak", {
            msg: "Welcome!",
        });

    });

    //Load Online Cooking

    app.get("/online-classes-during-lockdown", function (req, res) {
        res.render("ulala", {
            msg: "Welcome!",
        });

    });

     //Data Coronavirus part2 

     app.get("/coronavirus-statistics-testing-poland-and-mexico", function (req, res) {
        res.render("datacorona2", {
            msg: "Welcome!",
        });

    });

     // Cookies
     app.get("/cookies", function (req, res) {
        res.render("cookies", {
            msg: "Welcome!",
        });

    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });

   

}