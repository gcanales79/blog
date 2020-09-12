require('dotenv').config()
const axios = require("axios");
const moment = require('moment-timezone');

let url = process.env.url

axios.get(url + "/api/birthday", {

})
    .then((response) => {
        //console.log(response.data)
        recordarCumple(response.data)
    })
    .catch((err) => {
        console.log(err)
    })

function recordarCumple(datos) {
    console.log(datos)
    if(datos.length>0){
    for (let i = 0; i < datos.length; i++) {
        axios.post(process.env.url + "/todaybirthday", {
            name: datos[i].surname,
            surname: datos[i].name,
            birthday: moment(datos[i].birthday).format("DD-MMM-YYYY")

        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
else{
    console.log("No hay cumpleaños que celebrar")
}
}