require('dotenv').config()
const axios = require("axios");
const moment = require('moment-timezone');

var fecha_inicial = moment("2020-03-17")
//console.log("La fecha inicial es " + fecha_inicial);



var hoy = "2020-04-02";
//console.log("Hoy es " + hoy)
//console.log(today);

let countries = ["Italy", "Poland", "Mexico", "Spain"]




//console.log("La diferencia de dias son " + diffDays)

for (let i = 0; i < 24; i++) {

    for (let i = 0; i < countries.length; i++) {

        let fecha_registro = moment(hoy).add(i, "days").format("YYYY-MM-DD");
        //console.log("La fecha de registro " + fecha_registro)

        //console.log("La fecha de busqueda es: "+ fecha_busqueda)



        //console.log("La fecha de registro es " + fecha_registro);

        axios({
            "method": "GET",
            "url": "https://coronavirus-monitor.p.rapidapi.com/coronavirus/history_by_particular_country_by_date.php",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": process.env.RAPID_API_KEY,
            }, "params": {
                "country": countries[i],
                "date": fecha_registro
            }
        })
            .then((response) => {
                console.log(response.data.stat_by_country[response.data.stat_by_country.length - 1]);
                //console.log(moment(response.data.stat_by_country[response.data.stat_by_country.length - 1].record_date).format("YYYY-MM-DD"))
                var url = process.env.url;
                //console.log(url)
                //let buscarFecha=moment(fecha_registro).format("X")
                let datosNuevos = response;
                let numeroDato = i;
                axios.get(url + "/api/datos" + countries[i] + "/" + fecha_registro, {

                }).then((response) => {
                    //console.log(response)
                    if (response.length > 0) {
                        console.log("El id es " + response.data[0].id + " de " + countries[i])
                        let ultimaFecha = moment(response.data[0].fecha).format("YYYY-MM-DD");
                        let id = response.data[0].id;
                        if (fecha_registro === ultimaFecha) {
                            console.log("Son iguales")
                            actualizarDatos(datosNuevos, numeroDato, url, id)
                        }
                        else {
                            console.log("No son iguales")
                            guardarDatos(datosNuevos, numeroDato, url, countries[i])
                        }
                    }
                    else {
                        console.log("No hay datos")
                        guardarDatos(datosNuevos, numeroDato, url, countries[i])
                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })


            })
            .catch((error) => {
                console.log(error.response.status)
            })
    }
}

function guardarDatos(response, i, url) {
    axios.post(url + "/datos" + countries[i], {
        fecha: moment(response.data.stat_by_country[response.data.stat_by_country.length - 1].record_date).format("YYYY-MM-DD"),
        total_cases: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_cases).replace(/,/g, ''),
        new_cases: (response.data.stat_by_country[response.data.stat_by_country.length - 1].new_cases).replace(/,/g, ''),
        total_deaths: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_deaths).replace(/,/g, ''),
        new_deaths: (response.data.stat_by_country[response.data.stat_by_country.length - 1].new_deaths).replace(/,/g, ''),
        total_recovered: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_recovered).replace(/,/g, ''),
        total_tests: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_tests).replace(/,/g, ''),
        total_tests_per1m: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_tests_per1m).replace(/,/g, ''),
    })
        .then((response) => {
            //console.log("Los datos son:")
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

function actualizarDatos(response, i, url, id) {
    axios.put(url + "/api/actualizar/datos" + countries[i] + "/" + id, {
        fecha: moment(response.data.stat_by_country[response.data.stat_by_country.length - 1].record_date).format("YYYY-MM-DD"),
        total_cases: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_cases).replace(/,/g, ''),
        new_cases: (response.data.stat_by_country[response.data.stat_by_country.length - 1].new_cases).replace(/,/g, ''),
        total_deaths: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_deaths).replace(/,/g, ''),
        new_deaths: (response.data.stat_by_country[response.data.stat_by_country.length - 1].new_deaths).replace(/,/g, ''),
        total_recovered: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_recovered).replace(/,/g, ''),
        total_tests: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_tests).replace(/,/g, ''),
        total_tests_per1m: (response.data.stat_by_country[response.data.stat_by_country.length - 1].total_tests_per1m).replace(/,/g, ''),
    })
        .then((response) => {
            //console.log("Los datos son:")
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}