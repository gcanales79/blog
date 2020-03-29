$(document).ready(function () {
    let caso = 1;

    obtenerDatos(caso);

    function obtenerDatos(caso) {

        $.when(
            $.get("/api/todos/datosSpain", function (data) {
                //console.log(data)
            }),
            $.get("/api/todos/datosItaly", function (data) {
                //console.log(data)
            }),
            $.get("/api/todos/datosMexico", function (data) {
                //console.log(data)
            }),
            $.get("/api/todos/datosPoland", function (data) {
                //console.log(data)
            }),
        ).then((datosES, datosIT, datosMX, datosPL) => {
            //console.log(datosES[0], datosIT[0], datosMX[0], datosPL[0]);
            var casosES = [];
            var casosIT = [];
            var casosMX = [];
            var casosPL = [];
            for (let i = 0; i < datosES[0].length; i++) {
                casosES.push(datosES[0][i].total_cases);
                if (i == datosES[0].length - 1) {
                    //console.log(casosES)
                }
            }
            for (let i = 0; i < datosIT[0].length; i++) {
                casosIT.push(datosIT[0][i].total_cases);
                if (i == datosIT[0].length - 1) {
                    //console.log(casosIT)
                }
            }
            for (let i = 0; i < datosMX[0].length; i++) {
                casosMX.push(datosMX[0][i].total_cases);
                if (i == datosMX[0].length - 1) {
                    //console.log(casosMX)
                }
            }
            for (let i = 0; i < datosPL[0].length; i++) {
                casosPL.push(datosPL[0][i].total_cases);
                if (i == datosPL[0].length - 1) {
                    //console.log(casosPL)
                }
            }

            graficaCasos(casosES, casosIT, casosMX, casosPL)
            graficaPorcentajes(casosES, casosIT, casosMX, casosPL, caso)

        })
    }

    //Chart JS esto se pone al principio para que no muestre datos viejos
    //Grafica de Casos Totales 
    var myChart;

    function graficaCasos(casosES, casosIT, casosMX, casosPL) {
        console.log(casosIT)
        let ejeY = []
        for (let i = 0; i < casosIT.length; i++) {
            if (i % 5 == 0) {
                ejeY.push(i)
            }
            else {
                ejeY.push("")
            }
        }
        if (myChart) {
            myChart.destroy();
        }
        let ctx = $("#myChart");
        myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ejeY,
                datasets: [{
                    label: "Italy",
                    data: casosIT,
                    backgroundColor: [
                        'rgb(255,99,132)'
                    ],
                    fill: false,
                    borderColor: [
                        'rgb(255,99,132)'
                    ]
                }, {
                    label: "Spain",
                    data: casosES,
                    backgroundColor: [
                        'rgba(75, 192, 192)'
                    ],
                    fill: false,
                    borderColor: [
                        'rgba(75, 192, 192)'
                    ]
                }, {
                    label: "Mexico",
                    data: casosMX,
                    backgroundColor: [
                        'rgba(54, 162, 235)'
                    ],
                    fill: false,
                    borderColor: [
                        'rgba(54, 162, 235)'
                    ]
                }, {
                    label: "Poland",
                    data: casosPL,
                    backgroundColor: [
                        'rgb(254,214,0)'
                    ],
                    fill: false,
                    borderColor: [
                        'rgb(254,214,0)'
                    ]
                }
                ]

            },
            options: {
                scales: {
                    yAxes: [{
                        type: "logarithmic",
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            suggestedmax: 150000,
                            callback: function (value, index, values) {
                                if (value === 150000) return "150,000";
                                if (value === 100000) return "100,000";
                                if (value === 50000) return "50,000";
                                if (value === 20000) return "20,000";
                                if (value === 10000) return "10,000";
                                if (value === 5000) return "5,000";
                                if (value === 2000) return "2,000";
                                if (value === 1000) return "1,000";
                                if (value === 500) return "500";
                                if (value === 200) return "200";
                                if (value === 100) return "100";
                                if (value === 0) return "0";
                                return null;
                            }

                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Total Cases"
                        }


                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Number of days since 100th case"
                        }

                    }]
                },
                animation: {
                    duration: 2000,
                    onProgress: function () {
                        $("#loadingGraph").hide()
                    }
                },
                maintainAspectRatio: false,
            }
        })


    }

    //Grafica de Incremento de Casos %

    var myChart2;

    function graficaPorcentajes(casosES, casosIT, casosMX, casosPL, caso) {


        var porcentaje = [];
        var label = "";
        var colorBarras="";

        switch (caso) {
            case 1:
                label = "Italy"
                colorBarras="rgb(255,99,132"
                for (let i = 0; i < casosIT.length - 1; i++) {
                    porcentaje.push(((casosIT[i + 1] - casosIT[i]) / casosIT[i] * 100).toFixed(0))
                    if (i == casosIT.length - 2) {
                        console.log(porcentaje)
                    }
                }
                break;
            case 2:
                for (let i = 0; i < casosES.length - 1; i++) {
                    label = "Spain"
                    colorBarras="rgba(75, 192, 192"
                    porcentaje.push(((casosES[i + 1] - casosES[i]) / casosES[i] * 100).toFixed(0))
                    if (i == casosES.length - 2) {
                        console.log(porcentaje)
                    }
                }
                break;
            case 3:
                for (let i = 0; i < casosMX.length - 1; i++) {
                    label = "Mexico";
                    colorBarras="rgba(54, 162, 235"
                    porcentaje.push(((casosMX[i + 1] - casosMX[i]) / casosMX[i] * 100).toFixed(0))
                    if (i == casosMX.length - 2) {
                        console.log(porcentaje)
                    }
                }
                break;
            case 4:
                for (let i = 0; i < casosPL.length - 1; i++) {
                    label = "Poland";
                    colorBarras="rgb(254,214,0"
                    porcentaje.push(((casosPL[i + 1] - casosPL[i]) / casosPL[i] * 100).toFixed(0))
                    if (i == casosPL.length - 2) {
                        console.log(porcentaje)
                    }
                }
                break;
        }


        let ejeY = []
        for (let i = 0; i < porcentaje.length; i++) {
            if (i % 5 == 0) {
                ejeY.push(i)
            }
            else {
                ejeY.push("")
            }
        }

        if (myChart2) {
            myChart2.destroy();
        }
        let ctx = $("#myChart2");
        myChart2 = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ejeY,

                datasets: [{
                    label: label,
                    backgroundColor: colorBarras+",0.2)",
                    borderColor: colorBarras+",1)",
                    borderWidth: 1,
                    data: porcentaje,
                },
                ]

            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 100,
                            callback: function (value, index, values) {
                                if (value === 100) return "100%";
                                if (value === 90) return "90%";
                                if (value === 80) return "80%";
                                if (value === 70) return "70%";
                                if (value === 60) return "60%";
                                if (value === 50) return "50%";
                                if (value === 40) return "40%";
                                if (value === 30) return "30%";
                                if (value === 20) return "20%";
                                if (value === 10) return "10%";
                                if (value === 0) return "0%";
                                return null;
                            }

                        },
                        scaleLabel: {
                            display: true,
                            labelString: "% of Increase vs One Day Before"
                        }


                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Number of days since 100th case"
                        }

                    }]
                },
                animation: {
                    duration: 2000,
                    onProgress: function () {
                        $("#loadingGraph2").hide()
                    }
                },
                maintainAspectRatio: true,
            }
        })

    }

    $("#percentageItaly").on("click", function (event) {
        event.preventDefault();
        let caso = 1;
        obtenerDatos(caso)
    })

    $("#percentageSpain").on("click", function (event) {
        event.preventDefault();
        let caso = 2;
        obtenerDatos(caso)
    })

    $("#percentageMexico").on("click", function (event) {
        event.preventDefault();
        let caso = 3;
        obtenerDatos(caso)
    })

    $("#percentagePoland").on("click", function (event) {
        event.preventDefault();
        let caso = 4;
        obtenerDatos(caso)
    })



})