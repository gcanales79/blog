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

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });


}