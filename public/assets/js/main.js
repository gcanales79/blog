

$(document).ready(function () {


    /*const PUBLIC_VAPID_KEY = "BFcjk8hLF756Vzzw8VWPy2RzjD-OcLiMglaOcgoE2RWuM07lKQoolmT9vIyq8jCEIJvQUBqp3LOWscQLvwlMS68"

    const subscription = async () => {

        const register = await navigator.serviceWorker.register('/worker.js', {
            scope: "/"
        });
        console.log("New Service Worker")

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
        });


        await fetch("/subscription", {
            method: "POST",
            body: JSON.stringify({ subscription }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("Subscribed!!!")
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    subscription();*/


    "use strict";
    /* === Footer Instagram === */
    (function () {
        $('#footer-instagram').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 8,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }());
    /* === menu drop-down === */
    (function () {
        $('#food-feature-carousel').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            prevArrow: '<i class="fa fa-angle-left left"></i>',
            nextArrow: '<i class="fa fa-angle-right right"></i> ',
            responsive: [

                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }());
    (function () {
        $('.related-post-carousel-items').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            autoPlay: true,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }());
    (function () {
        $('.archi-feature-category').slick({
            centerMode: true,
            slidesToShow: 3,
            centerPadding: '60px',
            prevArrow: '<i class="fa fa-angle-left left"></i>',
            nextArrow: '<i class="fa fa-angle-right right"></i> ',
            responsive: [

                {
                    breakpoint: 800,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }());
    (function () {
        $('.popular-post-slider').slick({
            infinite: true,
            arrows: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 2,
            dots: true,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true
                    }
                }
            ]
        });
    }());
    /* === Search === */
    (function () {
        $('.top-search a').click(function (e) {
            e.preventDefault();
            //when the notification icon is clicked open the menu
            $(this).toggleClass('active');
            $('.show-search').fadeToggle(function () {
                //then bind the close event to html so it closes when you mouse off it.
                $('html').bind('click', function () {
                    $('.show-search').fadeOut(function () {
                        //once html has been clicked and the menu has closed, unbind the html click so nothing else has to lag up
                        $('html').unbind('click');
                    });
                    $('.top-search a').removeClass('active');
                });
                $('.show-search').bind('click', function (e) {
                    e.stopPropagation();
                });
            });
        });
    }());
    (function () {
        if (screen.width > 768) {
            var $dropdown = $(".nav .dropdown");
            $dropdown.mousemove(function () {
                $(this).addClass("open");
            });
            $dropdown.mouseleave(function () {
                $dropdown.removeClass("open");
            });
        }
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
            // Avoid following the href location when clicking
            event.preventDefault();
            // Avoid having the menu to close when clicking
            event.stopPropagation();
            // Re-add .open to parent sub-menu item
            $(this).parent().addClass('open');
            $(this).parent().find("ul").parent().find("li.dropdown").toggle('open');
            /* $(this).parent().find("ul").parent().find("li.dropdown").removeClass('open');*/

        });
    }());
    //scroll top

    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
        $('.scroll-up a').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });
    }());

    $("#tweetZone").empty();

    $.post("/tweets")

        .then(function (data) {
            //console.log(data)

            for (let i = 0; i < data.length; i++) {
                //console.log(data[i].text)
                let datos = data[i].text
                let tweet = datos.split("https")
                //console.log(data[i].created_at)
                let fechaTweet = moment(data[i].created_at, "ddd MMM DD HH:mm:ss ZZ YYYY")
                let now = moment()
                //console.log(now)
                //console.log((fechaTweet))
                let diasTweet = now.diff(fechaTweet, "days")
                //console.log(diasTweet)
                //console.log(tweet)
                let tweetText = tweet[0];
                let tweetLink = "https" + tweet[1];
                //console.log(tweetText);
                //console.log(tweetLink)
                //console.log(typeof(data[i].entities.media))
                //if (typeof(data[i].entities.media) != "undefined") {
                //console.log(data[i].entities.media[0].url)
                //}

                let newDiv = $("<div>")
                newDiv.attr("class", "single-tweet")
                let newP = $("<p>")
                newP.text(tweetText)
                let newUrl = $("<a>")
                newUrl.attr("href", tweetLink)
                newUrl.text(" " + tweetLink)
                let newSpace = $("<br>")
                let logo = $("<i>")
                logo.attr("class", "fa fa-twitter")
                let newh4 = $("<h4>")
                newh4.text("Tweeted on " + diasTweet + " days ago.")
                newh4.prepend(logo)
                newP.append(newSpace)
                newP.append(newUrl)
                newDiv.append(newP)
                newDiv.append(newh4)
                $("#tweetZone").append(newDiv)
            }
        })


}());
