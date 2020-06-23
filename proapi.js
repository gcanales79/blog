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

axios({
    "method":"GET",
    "url":"https://covid-193.p.rapidapi.com/history",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid-193.p.rapidapi.com",
    "x-rapidapi-key":"874b6ea923mshd7377a4cd4343e0p1a39c7jsn23e8edc291e0",
    "useQueryString":true
    },"params":{
    "day":fecha_registro,
    "country":countries[i]
    }
    })
    .then((response)=>{
      console.log(response.data.response[0].deaths["1M_pop"])
      //console.log(Object.keys(response.data.response[0].tests))
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
              //actualizarDatos(datosNuevos, numeroDato, url, id,countries[i],fecha_registro)


          }
          else {
              console.log("No hay datos")
              //guardarDatos(datosNuevos, numeroDato,url,countries[i],fecha_registro)
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
    let nuevosCasos=0;
    let nuevasMuertes=0;
    if ((response.data.response[0].cases.new)==null){
        nuevosCasos=0;
    }
    else{
        nuevosCasos=response.data.response[0].cases.new.replace("+","")
    }
    if ((response.data.response[0].deaths.new)==null){
        nuevasMuertes=0;
    }
    else{
        nuevasMuertes=response.data.response[0].deaths.new.replace("+","")
    }
    
   
        axios.post(url + "/datos" + countries, {
            fecha: moment(response.data.response[0].day).format("YYYY-MM-DD"),
            total_cases: response.data.response[0].cases.total,
            new_cases: nuevosCasos,
            total_deaths: (response.data.response[0].deaths.total),
            new_deaths: nuevasMuertes,
            total_recovered: response.data.response[0].cases.recovered,
            total_tests: response.data.response[0].tests.total,
            total_tests_per1m: response.data.response[0].tests["1M_pop"],
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
    let nuevosCasos=0;
    let nuevasMuertes=0;
    if ((response.data.response[0].cases.new)==null){
        nuevosCasos=0;
    }
    else{
        nuevosCasos=response.data.response[0].cases.new.replace("+","")
    }
    if ((response.data.response[0].deaths.new)==null){
        nuevasMuertes=0;
    }
    else{
        nuevasMuertes=response.data.response[0].deaths.new.replace("+","")
    }
        axios.put(url + "/api/actualizar/datos" + countries + "/" + id, {
            fecha: moment(response.data.response[0].day).format("YYYY-MM-DD"),
            total_cases: response.data.response[0].cases.total,
            new_cases: nuevosCasos,
            total_deaths: (response.data.response[0].deaths.total),
            new_deaths: nuevasMuertes,
            total_recovered: response.data.response[0].cases.recovered,
            total_tests: response.data.response[0].tests.total,
            total_tests_per1m: response.data.response[0].tests["1M_pop"],
        })
            .then((response) => {
                //console.log("Los datos son:")
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    
    
}