require('dotenv').config()
const axios = require("axios");
const moment = require('moment-timezone');

//console.log(process.argv[2])

let ISOcountries = ["POL","MEX","ITA","ESP"]

let countries = ["Poland","Mexico","Italy","Spain"]

let fecha_registro = moment(process.argv[2]).add(0, "days").format("YYYY-MM-DD");


for (let i = 0; i < countries.length; i++) {

  axios({
    "method": "GET",
    "url": "https://covid-19-statistics.p.rapidapi.com/reports",
    "headers": {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    }, "params": {
      "iso": ISOcountries[i],
      "date": fecha_registro,
    }
  })
    .then((response) => {
      //console.log(response.data)
      var url = process.env.url;
      //console.log(url)
      //let buscarFecha=moment(fecha_registro).format("X")
      let datosNuevos = response;
      let numeroDato = i;
      axios.get(url + "/api/datos" + countries[i] + "/" + fecha_registro, {

      }).then((response) => {
        //console.log(response.data)
        //console.log(response.data.length)
        if (response.data.length > 0) {
          //console.log("El id es " + response.data[0].id + " de " + countries[i])
          let id = response.data[0].id;

          console.log("Ya existe")
          actualizarDatos(datosNuevos, numeroDato, url, id)


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
      console.log(error)
    })
}


function guardarDatos(response, i, url) {
  //console.log(response.data)
  console.log(response.data.data[0].confirmed)

  axios.post(url + "/datos" + countries[i], {
    fecha: moment(response.data.data[0].date).format("YYYY-MM-DD"),
    total_cases: (response.data.data[0].confirmed),
    new_cases: (response.data.data[0].confirmed_diff),
    total_deaths: (response.data.data[0].deaths),
    new_deaths: (response.data.data[0].deaths_diff),
    total_recovered: (response.data.data[0].recovered),

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
  console.log(response.data.data[0].confirmed)
  axios.put(url + "/api/actualizar/datos" + countries[i] + "/" + id, {
    fecha: moment(response.data.data[0].date).format("YYYY-MM-DD"),
    total_cases: (response.data.data[0].confirmed),
    new_cases: (response.data.data[0].confirmed_diff),
    total_deaths: (response.data.data[0].deaths),
    new_deaths: (response.data.data[0].deaths_diff),
    total_recovered: (response.data.data[0].recovered),
  })
    .then((response) => {
      //console.log("Los datos son:")
      console.log(response.data)
    })
    .catch((err) => {
      console.log(err)
    })


}