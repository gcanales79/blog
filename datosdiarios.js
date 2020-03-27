const axios = require("axios");
const moment = require('moment-timezone');

var fecha_inicial = moment("2020-03-17")
//console.log("La fecha inicial es " + fecha_inicial);


var hoy = moment();
//console.log("Hoy es " + hoy)
//console.log(today);

let countries=["Italy","Poland","Mexico","Spain"]

let diffDays = hoy.diff(fecha_inicial, "days")


//console.log("La diferencia de dias son " + diffDays)

for (let i = 0; i < countries.length; i++) {

    fecha_registro = moment(hoy).subtract(1,"days").format("YYYY-MM-DD")

    //console.log(fecha_registro);

    axios({
        "method": "GET",
        "url": "https://coronavirus-monitor.p.rapidapi.com/coronavirus/history_by_country_and_date.php",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "874b6ea923mshd7377a4cd4343e0p1a39c7jsn23e8edc291e0"
        }, "params": {
            "country": countries[i],
            "date": fecha_registro
        }
    })
        .then((response) => {
            console.log(response.data.stat_by_country[response.data.stat_by_country.length - 1]);
            console.log(moment(response.data.stat_by_country[response.data.stat_by_country.length - 1].record_date).format("YYYY-MM-DD"))
            axios.post("https://bitesoftheworld/datos"+countries[i], {
                fecha: moment(response.data.stat_by_country[response.data.stat_by_country.length - 1].record_date).format("YYYY-MM-DD"),
                total_cases: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_cases).replace(/,/g, ''),
                new_cases: (response.data.stat_by_country[response.data.stat_by_country.length - 1].new_cases).replace(/,/g, ''),
                total_deaths: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_deaths).replace(/,/g, ''),
                new_deaths: (response.data.stat_by_country[response.data.stat_by_country.length - 1].new_deaths).replace(/,/g, ''),
                total_recovered: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_recovered).replace(/,/g, ''),
            })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((error) => {
            console.log(error)
        })
}
