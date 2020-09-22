module.exports = function (app) {


    // Load index page
    app.get("/", function (req, res) {
        res.locals.metaTags = {
            title: "Bites of the World - Blog About Food and Travel",
            description: "A lover of food and great places to enjoy with the family",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Monterrey, place to eat, place to drink"

        }
        res.render("index", {
            msg: "Welcome!",
        });

    });

    // Load comming soon page
    app.get("/coming-soon", function (req, res) {
        res.locals.metaTags = {
            title: "Coming Soon - Bites of the World",
            description: "Underconstruction Page by Bites of the World",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("coming", {
            msg: "Welcome!",
        });

    });

    // Load Trattoria Da Antonio 08MAR20
    app.get("/trattoria-da-antonio", function (req, res) {
        res.locals.metaTags = {
            title: "Excellent Italian Trattoria Restaurant in Warsaw – Trattoria Da Antonio- Bites of the World",
            description: "Trattoria Da Antonio, Italian restaurant offering really good food and family friendly environment. ",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("daAntonio", {
            msg: "Welcome!",
        });

    });

    // Load Coronavirus
    app.get("/coronavirus", function (req, res) {
        res.locals.metaTags = {
            title: "Coronavirus data graph of Poland and Mexico - Bites of the World",
            description: "Same Coronavirus graphs as the Financial Times but specifically of Poland and Mexico. Including Mobility Graphs",
            keywords: "COVID19, Coronavirus, Poland, Mexico, Test per 1M, infected, cases, daily cases, death rate"

        }
        res.render("coronavirus", {
            msg: "Welcome!",
        });

    });

    // Load Data Coronavirus 12APR20
    app.get("/data-coronavirus-poland-and-mexico", function (req, res) {
        res.locals.metaTags = {
            title: "Coronavirus data graph of Poland and Mexico - Bites of the World",
            description: "Same Coronavirus graphs as the Financial Times but specifically of Poland and Mexico. Including Mobility Graphs",
            keywords: "COVID19, Coronavirus, Poland, Mexico, Test per 1M, infected, cases, daily cases, death rate"

        }
        res.render("datacorona", {
            msg: "Welcome!",
        });

    });

    // Load Grill Part 1 13APR20
    app.get("/steak-at-poland", function (req, res) {
        res.locals.metaTags = {
            title: "Best Steak in Poland - Bites of the World",
            description: "Recommendation of butcheries where you can buy the best steak in Warsaw.",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("steak", {
            msg: "Welcome!",
        });

    });

    //Load Online Cooking 25APR20

    app.get("/online-classes-during-lockdown", function (req, res) {
        res.locals.metaTags = {
            title: "Online Classes During Lockdown - Bites of the World",
            description: "Ideas of what to do during the Coronavirus Lockdown",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("ulala", {
            msg: "Welcome!",
        });

    });

    //Data Coronavirus part2 02MAY20

    app.get("/coronavirus-statistics-testing-poland-and-mexico", function (req, res) {
        res.locals.metaTags = {
            title: "Coronavirus data graph of Poland and Mexico - Bites of the World",
            description: "Same Coronavirus graphs as the Financial Times but specifically of Poland and Mexico",
            keywords: "COVID19, Coronavirus, Poland, Mexico, Test per 1M, infected, cases, daily cases, death rate"

        }
        res.render("datacorona2", {
            msg: "Welcome!",
        });

    });

    //Mexican Food 23MAY20

    app.get("/best-mexican-food-in-warsaw", function (req, res) {
        res.locals.metaTags = {
            title: "Best mexican food in Warsaw - Bites of the World",
            description: "Recommendation of the best places to eat Mexican food in Warsaw",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink",
            site: "@bitesworld_mx" ,
            creator:"@bitesworld_mx",
            url:"https://bitesoftheworld.mx/best-mexican-food-in-warsaw",
            twitterTitle:"Best Mexican Food in Warsaw",
            twitterDescription:"If you want to find authentic mexican food in Warsaw you can go to these places.",
            image:"https://bitesoftheworld.mx/assets/images/bitesoftheworldmx-tacospastor.png",

        }

        res.render("mexican", {
            msg: "Welcome!",
        });

    });

    //All Food Post

    app.get("/food-post", function (req, res) {
        res.locals.metaTags = {
            title: "Recommendations of restaurant to visit  - Bites of the World",
            description: "Review of restaurants in Warsaw and in Monterrey ",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("food", {
            msg: "Welcome!",
        });

    });

    //Park Cafe 29MAY20

    app.get("/garden-restaurant-park-cafe-konstancin", function (req, res) {
        res.locals.metaTags = {
            title: "Nice Restaurant in Konstancin Park Cafe - Bites of the World",
            description: "Beatiful restuarant in Konstancin with a nice garden and enough social distancing",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("parkcafe", {
            msg: "Welcome!",
        });

    });

    //Books 5JUN20

    app.get("/kindle-books-must-read-management", function (req, res) {
        res.locals.metaTags = {
            title: "Management Books That You Must Read for Kindle - Bites of the World",
            description: "Management Books that have changed by way of thinking that can be bought for Kindle",
            keywords: "books, management, read, books to read, books for kindle, books online, books to read online, books must read"

        }
        res.render("books", {
            msg: "Welcome!",
        });

    });

    //Travel Posts

    app.get("/travel-post", function (req, res) {
        res.locals.metaTags = {
            title: "Travel Advices - Bites of the World",
            description: "Travel Advices Hotel Places to Go for Families with Children",
            keywords: "travel with family, travel, hotel, airplane, cities to visit,things to see"

        }
        res.render("travel", {
            msg: "Welcome!",
        });

    });

    //Flaming and Co. 13JUN20
    app.get("/nice-food-restaurant-poland-warsaw-flaming-and-co-with-terrace", function (req, res) {
        res.locals.metaTags = {
            title: "Flaming and Co. a Restaurant with Playground and Nice Garden - Bites of the World",
            description: "The best food you can get in Warsaw with a playground for the little kids",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Poland, place to eat, place to drink, restaurant and playground, family dinning"

        }
        res.render("flaming", {
            msg: "Welcome!",
        });

    });

    //Pub Lolek 26JUL20
    app.get("/restaurant-pole-mokotowskie-park-summer-grill-bar-pub-lolek", function (req, res) {
        res.locals.metaTags = {
            title: "Pub Lolek Great Grill Restaurant in a Beautiful Park - Bites of the World",
            description: "If you are looking for some grill restaurant Pub Lolek is the place to go",
            keywords: "food, restaurant, grill, children, park, playground, restaurants, place to go, Warsaw, Poland, place to eat, place to drink, restaurant and playground, family dinning"

        }
        res.render("publolek", {
            msg: "Welcome!",
        });

    });

    //About Me 20SEP20
    app.get("/about", function (req, res) {
        res.locals.metaTags = {
            title: "About Me - Bites of the World",
            description: "Blog with plenty of ideas of where to eat specially in Warsaw",
            keywords: "food, restaurant, grill, children, park, playground, restaurants, place to go, Warsaw, Poland, place to eat, place to drink, restaurant and playground, family dinning"

        }
        res.render("aboutme", {
            msg: "Welcome!",
        });

    });

     //Zakopane Me 20SEP20
     app.get("/be-happy-in-zakopane-lake-morskie-oko-gravitational-slide", function (req, res) {
        res.locals.metaTags = {
            title: "About Me - Bites of the World",
            description: "Zakopane is also fun in the summer, visit Lake Morskie and Gubalowka",
            keywords: "Zakopane, gravitational slide, morskie oko, lake, food, restaurant, grill, children, park, playground, restaurants, place to go, Warsaw, Poland, place to eat, place to drink, restaurant and playground, family dinning",
            cardType: "summary",
            site: "@bitesworld_mx" ,
            creator:"@bitesworld_mx",
            url:"https://bitesoftheworld.mx/be-happy-in-zakopane-lake-morskie-oko-gravitational-slide",
            twitterTitle:"Discover one of the most beautiful lakes in the World",
            twitterDescription:"Lake Morskie Oko is a must to see when you are in Zakopane",
            image:"https://bitesoftheworld.mx/assets/images/bitesoftheworldmx-zakopane-morskie-oko-min.jpeg",


        }
        res.render("zakopane", {
            msg: "Welcome!",
        });

    });

    // Cookies
    app.get("/cookies", function (req, res) {
        res.locals.metaTags = {
            title: "Cookies Acceptance Page - Bites of the World",
            description: "Please accept our cookies",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("cookies", {
            msg: "Welcome!",
        });

    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.locals.metaTags = {
            title: "404 Page Ups Something Went Wrong- Bites of the World",
            description: "This is a 404 Page, please try again",
            keywords: "food, restaurant, restaurants, place to go, Warsaw, Konstancin, Monterrey, place to eat, place to drink"

        }
        res.render("404");
    });



}