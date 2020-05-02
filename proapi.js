require('dotenv').config()
const axios = require("axios");
const moment = require('moment-timezone');

if (process.argv[2]==null) {
    console.log("No hay process arguments")
    var date=moment()
}

else{
    console.log("Si hay process argv y es " + process.argv[2])
    var date=process.argv[2]
}

//date='2020-05-01'

let countries = ["Poland","Italy","Mexico","Spain"]

let fecha_registro = moment(date).add(0, "days").format("YYYY-MM-DD");

for (let i=0; i<countries.length; i++) {

axios({
    "method":"GET",
    "url":"https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid19-monitor-pro.p.rapidapi.com",
    "x-rapidapi-key":process.env.RAPID_API_KEY,
    },"params":{
    "country":countries[i],
    }
    })
    .then((response)=>{
      //console.log(response.data[date])
      //console.log(Object.keys(response.data))
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
              console.log("El id es " + response.data[0].id + " de " + countries[i])
              let id = response.data[0].id;

              console.log("Ya existe")
              actualizarDatos(datosNuevos, numeroDato, url, id,countries[i],fecha_registro)


          }
          else {
              console.log("No hay datos")
              guardarDatos(datosNuevos, numeroDato, url, countries[i],fecha_registro)
          }
      })
          .catch((err) => {
              console.log(err)
          })

    })
    .catch((error)=>{
      console.log(error)
    })

}

function guardarDatos(response, i, url,countries,fecha_registro) {
    //console.log(fecha_registro)
    //console.log(response.data[fecha_registro])
    
    if (response.data[fecha_registro].total_tests != null) {
        axios.post(url + "/datos" + countries, {
            fecha: moment(response.data[fecha_registro].record_date).format("YYYY-MM-DD"),
            total_cases: (response.data[fecha_registro].total_cases).replace(/,/g, ''),
            new_cases: (response.data[fecha_registro].new_cases).replace(/,/g, ''),
            total_deaths: (response.data[fecha_registro].total_deaths).replace(/,/g, ''),
            new_deaths: (response.data[fecha_registro].new_deaths).replace(/,/g, ''),
            total_recovered: (response.data[fecha_registro].total_recovered).replace(/,/g, ''),
            total_tests: (response.data[fecha_registro].total_tests).replace(/,/g, ''),
            total_tests_per1m: (response.data[fecha_registro].tests_per_1m).replace(/,/g, ''),
        })
            .then((response) => {
                //console.log("Los datos son:")
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    else {
        axios.post(url + "/datos" + countries, {
            fecha: moment(response.data[fecha_registro].record_date).format("YYYY-MM-DD"),
            total_cases: (response.data[fecha_registro].total_cases).replace(/,/g, ''),
            new_cases: (response.data[fecha_registro].new_cases).replace(/,/g, ''),
            total_deaths: (response.data[fecha_registro].total_deaths).replace(/,/g, ''),
            new_deaths: (response.data[fecha_registro].new_deaths).replace(/,/g, ''),
            total_recovered: (response.data[fecha_registro].total_recovered).replace(/,/g, ''),
            total_tests: (response.data[fecha_registro].total_tests),
            total_tests_per1m: (response.data[fecha_registro].tests_per_1m),
        })
            .then((response) => {
                //console.log("Los datos son:")
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

function actualizarDatos(response, i, url, id,countries,fecha_registro) {
    if (response.data[fecha_registro].total_tests != null) {
        axios.put(url + "/api/actualizar/datos" + countries + "/" + id, {
            fecha: moment(response.data[fecha_registro].record_date).format("YYYY-MM-DD"),
            total_cases: (response.data[fecha_registro].total_cases).replace(/,/g, ''),
            new_cases: (response.data[fecha_registro].new_cases).replace(/,/g, ''),
            total_deaths: (response.data[fecha_registro].total_deaths).replace(/,/g, ''),
            new_deaths: (response.data[fecha_registro].new_deaths).replace(/,/g, ''),
            total_recovered: (response.data[fecha_registro].total_recovered).replace(/,/g, ''),
            total_tests: (response.data[fecha_registro].total_tests).replace(/,/g, ''),
            total_tests_per1m: (response.data[fecha_registro].tests_per_1m).replace(/,/g, ''),
        })
            .then((response) => {
                //console.log("Los datos son:")
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    else {
        axios.put(url + "/api/actualizar/datos" + countries + "/" + id, {
            fecha: moment(response.data[fecha_registro].record_date).format("YYYY-MM-DD"),
            total_cases: (response.data[fecha_registro].total_cases).replace(/,/g, ''),
            new_cases: (response.data[fecha_registro].new_cases).replace(/,/g, ''),
            total_deaths: (response.data[fecha_registro].total_deaths).replace(/,/g, ''),
            new_deaths: (response.data[fecha_registro].new_deaths).replace(/,/g, ''),
            total_recovered: (response.data[fecha_registro].total_recovered).replace(/,/g, ''),
            total_tests: (response.data[fecha_registro].total_tests),
            total_tests_per1m: (response.data[fecha_registro].tests_per_1m),
        })
            .then((response) => {
                //console.log("Los datos son:")
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}