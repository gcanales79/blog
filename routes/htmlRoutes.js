module.exports = function (app) {


    // Load index page
    app.get("/", function (req, res) {
        res.locals.metaTags={
            title: "Bites of the World - Blog About Food and Travel",
            description:"A lover of food and great places to enjoy with the family",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Monterrey, place to eat, place to drink"

        }
        res.render("index", {
            msg: "Welcome!",
        });

    });

    // Load comming soon page
    app.get("/coming-soon", function (req, res) {
        res.locals.metaTags={
            title: "Coming Soon - Bites of the World",
            description:"Underconstruction Page by Bites of the World",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("coming", {
            msg: "Welcome!",
        });

    });

    // Load Trattoria Da Antonio
    app.get("/trattoria-da-antonio", function (req, res) {
        res.locals.metaTags={
            title: "Excellent Italian Trattoria Restaurant in Warsaw – Trattoria Da Antonio- Bites of the World",
            description:"Trattoria Da Antonio, Italian restaurant offering really good food and family friendly environment. ",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("daAntonio", {
            msg: "Welcome!",
        });

    });

    // Load Coronavirus
    app.get("/coronavirus", function (req, res) {
        es.locals.metaTags={
            title: "Coronavirus data graph of Poland and Mexico - Bites of the World",
            description:"Same Coronavirus graphs as the Financial Times but specifically of Poland and Mexico. Including Mobility Graphs",
            keywords:"COVID19, Coronavirus, Poland, Mexico, Test per 1M, infected, cases, daily cases, death rate"

        }
        res.render("coronavirus", {
            msg: "Welcome!",
        });

    });

    // Load Data Coronavirus
    app.get("/data-coronavirus-poland-and-mexico", function (req, res) {
        res.locals.metaTags={
            title: "Coronavirus data graph of Poland and Mexico - Bites of the World",
            description:"Same Coronavirus graphs as the Financial Times but specifically of Poland and Mexico. Including Mobility Graphs",
            keywords:"COVID19, Coronavirus, Poland, Mexico, Test per 1M, infected, cases, daily cases, death rate"

        }
        res.render("datacorona", {
            msg: "Welcome!",
        });

    });

     // Load Grill Part 1
     app.get("/steak-at-poland", function (req, res) {
        res.locals.metaTags={
            title: "Best Steak in Poland - Bites of the World",
            description:"Recommendation of butcheries where you can buy the best steak in Warsaw.",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("steak", {
            msg: "Welcome!",
        });

    });

    //Load Online Cooking

    app.get("/online-classes-during-lockdown", function (req, res) {
        res.locals.metaTags={
            title: "Online Classes During Lockdown - Bites of the World",
            description:"Ideas of what to do during the Coronavirus Lockdown",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("ulala", {
            msg: "Welcome!",
        });

    });

     //Data Coronavirus part2 

     app.get("/coronavirus-statistics-testing-poland-and-mexico", function (req, res) {
        res.locals.metaTags={
            title: "Coronavirus data graph of Poland and Mexico - Bites of the World",
            description:"Same Coronavirus graphs as the Financial Times but specifically of Poland and Mexico",
            keywords:"COVID19, Coronavirus, Poland, Mexico, Test per 1M, infected, cases, daily cases, death rate"

        }
        res.render("datacorona2", {
            msg: "Welcome!",
        });

    });

    //Mexican Food

    app.get("/best-mexican-food-in-warsaw", function (req, res) {
        res.locals.metaTags={
            title: "Best mexican food in Warsaw - Bites of the World",
            description:"Recommendation of the best places to eat Mexican food in Warsaw",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        
        res.render("mexican", {
            msg: "Welcome!",
        });

    });

     //All Food Post

     app.get("/food-post", function (req, res) {
        res.locals.metaTags={
            title: "Recommendations of restaurant to visit  - Bites of the World",
            description:"Review of restaurants in Warsaw and in Monterrey ",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("food", {
            msg: "Welcome!",
        });

    });

    //Park Cafe

    app.get("/garden-restaurant-park-cafe-konstancin", function (req, res) {
        res.locals.metaTags={
            title: "Nice Restaurant in Konstancin Park Cafe - Bites of the World",
            description:"Beatiful restuarant in Konstancin with a nice garden and enough social distancing",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("parkcafe", {
            msg: "Welcome!",
        });

    });

     // Cookies
     app.get("/cookies", function (req, res) {
        res.locals.metaTags={
            title: "Cookies Acceptance Page - Bites of the World",
            description:"Please accept our cookies",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("cookies", {
            msg: "Welcome!",
        });

    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.locals.metaTags={
            title: "404 Page Ups Something Went Wrong- Bites of the World",
            description:"This is a 404 Page, please try again",
            keywords:"food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("404");
    });

   

}