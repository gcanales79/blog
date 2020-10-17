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

//dia=moment().format("YYYY-MM-DD")

let countries = ["Poland","Italy","Mexico","Spain"]

let fecha_registro = moment(date).add(0, "days").format("YYYY-MM-DD");

for (let i=0; i<countries.length; i++) {

axios("https://corona.lmao.ninja/v2/countries/"+countries[i]+"?yesterday&strict&query%20", {
   
    })
    .then((response)=>{
      //console.log(response.data)
      //console.log(Object.keys(response.data.response[0]))
      var url = process.env.url_blog;
      //console.log(url)
      //let buscarFecha=moment(fecha_registro).format("X")
      let datosNuevos = response;
      let numeroDato = i;
      let fecha_registro = moment(response.data.updated).format("YYYY-MM-DD")
      console.log(fecha_registro)
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
              guardarDatos(datosNuevos,numeroDato,url,countries[i],fecha_registro)
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

function guardarDatos(response,i,url,countries,fecha_registro) {
    //console.log(fecha_registro)
    //console.log(response.data[fecha_registro])
       
   
        axios.post(process.env.url_blog + "/datos" + countries, {
            fecha: fecha_registro,
            total_cases: response.data.cases,
            new_cases: response.data.todayCases,
            total_deaths: response.data.deaths,
            new_deaths: response.data.todayDeaths,
            total_recovered: response.data.recovered,
            total_tests: response.data.tests,
            total_tests_per1m: response.data.testsPerOneMillion,
        })
            .then((response) => {
                //console.log("Los datos son:")
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    
    

}

function actualizarDatos(response, i, url, id,countries,fecha_registro) {
   
        axios.put(url + "/api/actualizar/datos" + countries + "/" + id, {
            fecha: fecha_registro,
            total_cases: response.data.cases,
            new_cases: response.data.todayCases,
            total_deaths: response.data.deaths,
            new_deaths: response.data.todayDeaths,
            total_recovered: response.data.recovered,
            total_tests: response.data.tests,
            total_tests_per1m: response.data.testsPerOneMillion,
        })
            .then((response) => {
                //console.log("Los datos son:")
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    
    
}