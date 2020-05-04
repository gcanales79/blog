$(document).ready(function () {
    let caso = 1;
    let widthPantalla = $(window).width()
    //console.log("La pantalla mide de width: " + widthPantalla)

    obtenerDatos(caso);
    datosAbril();

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
            var deathMX = [];
            var deathPL = [];
            var newcasosMX = [];
            var newdeathsMX = [];
            var newcasosPL = [];
            var newdeathsPL = [];
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
                casosMX.push(parseInt(datosMX[0][i].total_cases));
                deathMX.push(datosMX[0][i].total_deaths);
                newcasosMX.push(parseInt(datosMX[0][i].new_cases));
                newdeathsMX.push(datosMX[0][i].new_deaths);

                if (i == datosMX[0].length - 1) {
                    //console.log(casosMX)
                }
            }
            for (let i = 0; i < datosPL[0].length; i++) {
                casosPL.push(parseInt(datosPL[0][i].total_cases));
                deathPL.push(datosPL[0][i].total_deaths);
                newcasosPL.push(parseInt(datosPL[0][i].new_cases));
                newdeathsPL.push(datosPL[0][i].new_deaths);
                if (i == datosPL[0].length - 1) {
                    //console.log(casosPL)
                }
            }

            graficaCasos(casosES, casosIT, casosMX, casosPL)
            graficaPorcentajes(casosES, casosIT, casosMX, casosPL, caso)
            google.charts.load('current', { packages: ['corechart', 'line'] });
            google.charts.setOnLoadCallback(function () {
                drawBackgroundColor(deathMX)
            });
            google.charts.setOnLoadCallback(function () {
                polandRate(deathPL)
                newCasesMXavg(newcasosMX)
                newDeathsMXavg(newdeathsMX)
                newCasesPLavg(newcasosPL)
                newDeathsPLavg(newdeathsPL)
                graficaDailyTotal(casosMX, newcasosMX, casosPL, newcasosPL)
            });

        })
    }

    function datosAbril() {
        $.when(
            $.get("/api/abril/datosPoland", function (data) {
                //console.log(data)
            }),
            $.get("/api/abril/datosMexico", function (data) {
                //console.log(data)
            }),
        ).then((datosPL, datosMX) => {
            //console.log(datosPL[0],datosMX[0])
            let testingPL = [];
            let testingMX = [];
            let testing1MMX = [];
            let testing1MPL = [];
            for (let i = 0; i < datosPL[0].length; i++) {
                testingPL.push([new Date((datosPL[0][i].fecha).slice(0, 10)), parseInt(datosPL[0][i].total_tests)]);
                testing1MPL.push([new Date((datosPL[0][i].fecha).slice(0, 10)), parseInt(datosPL[0][i].total_tests_per1m)]);
                if (i == datosPL[0].length - 1) {
                    //console.log(testingPL)
                    //console.log(testing1MPL)
                }
            }
            for (let i = 0; i < datosMX[0].length; i++) {
                testingMX.push([new Date((datosPL[0][i].fecha).slice(0, 10)), parseInt(datosMX[0][i].total_tests)]);
                testing1MMX.push([new Date((datosPL[0][i].fecha).slice(0, 10)), parseInt(datosMX[0][i].total_tests_per1m)]);
                if (i == datosMX[0].length - 1) {
                    //console.log(testingMX)
                    //console.log(testing1MMX)
                }
            }
            google.charts.load('current', { packages: ['corechart', 'line'] });
            google.charts.setOnLoadCallback(function () {
                testingPerdatePoland(testingPL)
                testingPer1MPoland(testing1MPL)
                testingPerdateMX(testingMX)
                testingPer1MMX(testing1MMX)

            });


        }

        )

    }

    function graficaDailyTotal(casosMX, newcasosMX, casosPL, newcasosPL) {
        let movAvgMX = []
        let movAvgPL=[]
        //Get Data from MX and moving Avg.
        for (let i = 0; i < newcasosMX.length - 6; i++) {
            movAvgMX.push([casosMX[i+6],(newcasosMX[i] + newcasosMX[i + 1] + newcasosMX[i + 2] +
                newcasosMX[i + 3] + newcasosMX[i + 4] + newcasosMX[i + 5] + newcasosMX[i + 6])/7])
            if(i==newcasosMX.length-7){
                //console.log(movAvgMX)
            }
        }
        //Get Data from PL and moving Avg.
        for (let i = 0; i < newcasosPL.length - 6; i++) {
            movAvgPL.push([casosPL[i+6],(newcasosPL[i] + newcasosPL[i + 1] + newcasosPL[i + 2] +
                newcasosPL[i + 3] + newcasosPL[i + 4] + newcasosPL[i + 5] + newcasosPL[i + 6])/7])
            if(i==newcasosPL.length-7){
                //console.log(movAvgPL)
            }
        }

        var data1 = new google.visualization.DataTable();
        data1.addColumn('number', "Total Cases");
        data1.addColumn('number', 'Mexico');

        data1.addRows(movAvgMX);

        var data2 = new google.visualization.DataTable();
        data2.addColumn('number', "Total Cases");
        data2.addColumn('number', 'Poland');

        data2.addRows(movAvgPL);

        var joinedData=google.visualization.data.join(data1,data2,"full",[[0,0]],[1],[1]);

        var options = {
            colors: ["green","red"],
            animation: {
                startup: true,
                duration: 1000,
                easing:"in",
            },
            interpolateNulls: true,
            hAxis: {
                title: 'Total Cases',
                format:"short",
            },
            vAxis: {
                title: 'Avg. New Cases (7-day Rolling Avg.)',
                format:"short",
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("graficaNvoCasosTotalCasos"));
        chart.draw(joinedData, options);

    }

    //Chart JS esto se pone al principio para que no muestre datos viejos
    //Grafica de Casos Totales 
    var myChart;

    function graficaCasos(casosES, casosIT, casosMX, casosPL) {
        if (widthPantalla > 800) {
            opcionRatio = true;
        }
        else {
            opcionRatio = false;
        }
        //console.log(casosIT)
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
                maintainAspectRatio: opcionRatio,
            }
        })


    }

    //Grafica de Incremento de Casos %

    var myChart2;

    function graficaPorcentajes(casosES, casosIT, casosMX, casosPL, caso) {


        var porcentaje = [];
        var label = "";
        var colorBarras = "";

        switch (caso) {
            case 1:
                label = "Italy"
                colorBarras = "rgb(255,99,132"
                for (let i = 0; i < casosIT.length - 1; i++) {
                    porcentaje.push(((casosIT[i + 1] - casosIT[i]) / casosIT[i] * 100).toFixed(0))
                    if (i == casosIT.length - 2) {
                        //console.log(porcentaje)
                    }
                }
                break;
            case 2:
                for (let i = 0; i < casosES.length - 1; i++) {
                    label = "Spain"
                    colorBarras = "rgba(75, 192, 192"
                    porcentaje.push(((casosES[i + 1] - casosES[i]) / casosES[i] * 100).toFixed(0))
                    if (i == casosES.length - 2) {
                        //console.log(porcentaje)
                    }
                }
                break;
            case 3:
                for (let i = 0; i < casosMX.length - 1; i++) {
                    label = "Mexico";
                    colorBarras = "rgba(54, 162, 235"
                    porcentaje.push(((casosMX[i + 1] - casosMX[i]) / casosMX[i] * 100).toFixed(0))
                    if (i == casosMX.length - 2) {
                        //console.log(porcentaje)
                    }
                }
                break;
            case 4:
                for (let i = 0; i < casosPL.length - 1; i++) {
                    label = "Poland";
                    colorBarras = "rgb(254,214,0"
                    porcentaje.push(((casosPL[i + 1] - casosPL[i]) / casosPL[i] * 100).toFixed(0))
                    if (i == casosPL.length - 2) {
                        //console.log(porcentaje)
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
                    backgroundColor: colorBarras + ",0.2)",
                    borderColor: colorBarras + ",1)",
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

    //Make google graph of deaths



    function drawBackgroundColor(deathMX) {
        //console.log(deathMX)
        let datosDeath = []
        for (let i = 0; i < deathMX.length; i++) {
            datosDeath.push([i, parseInt(deathMX[i])])
            if (i == deathMX.length - 1) {
                //console.log(datosDeath)
            }
        }
        var data = new google.visualization.DataTable();
        data.addColumn('number', "Days");
        data.addColumn('number', 'Mexico');

        data.addRows(datosDeath);

        var options = {
            colors: ["green"],
            hAxis: {
                title: '# of Days since the 100th Case'
            },
            vAxis: {
                title: 'Total Deaths'
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },

            trendlines: {
                0: {
                    type: "exponential",
                    showR2: true,
                    visibleInLegend: true,
                    color: "red",
                    lineWidth: 10,
                    opacity: 0.2,
                }
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById("graficaGoogle"));
        chart.draw(data, options);
    }

    function polandRate(deathPL) {
        //console.log(deathMX)
        let datosDeath = []
        for (let i = 0; i < deathPL.length; i++) {
            datosDeath.push([i, parseInt(deathPL[i])])
            if (i == deathPL.length - 1) {
                // console.log(datosDeath)
            }
        }
        var data = new google.visualization.DataTable();
        data.addColumn('number', "Days");
        data.addColumn('number', 'Poland');

        data.addRows(datosDeath);

        var options = {
            colors: ["red"],
            hAxis: {
                title: '# of Days since the 100th Case'
            },
            vAxis: {
                title: 'Total Deaths'
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },

            trendlines: {
                0: {
                    type: "exponential",
                    showR2: true,
                    visibleInLegend: true,
                    color: "red",
                    lineWidth: 10,
                    opacity: 0.2,
                }
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById("graficaPolonia"));
        chart.draw(data, options);
    }

    //New cases daily Mov-Avg

    function newCasesMXavg(newcasos) {
        //console.log(deathMX)
        let newcasosNum = []
        for (let i = 0; i < newcasos.length; i++) {
            newcasosNum.push(parseInt(newcasos[i]))
            if (i == newcasos.length - 1) {
                //console.log(newcasosNum)
            }
        }
        let movavg = []
        for (let i = 0; i < newcasosNum.length - 6; i++) {
            movavg.push([i, (newcasosNum[i] + newcasosNum[i + 1] + newcasosNum[i + 2] + newcasosNum[i + 3] + newcasosNum[i + 4] + newcasosNum[i + 5] + newcasosNum[i + 6]) / 7])
            if (i == newcasosNum.length - 7) {
                //console.log(movavg)
            }
        }


        var data = new google.visualization.DataTable();
        data.addColumn('number', "Days");
        data.addColumn('number', 'Mexico');

        data.addRows(movavg);

        var options = {
            colors: ["green"],
            hAxis: {
                title: '# of Days since the 100th Case'
            },
            vAxis: {
                title: 'New Cases per Day (7 Day Rolling Average)'
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("graficaNuevoscasosMX"));
        chart.draw(data, options);
    }

    //New deaths daily Mov-Avg

    function newDeathsMXavg(newcasos) {
        //console.log(deathMX)
        let newcasosNum = []
        for (let i = 0; i < newcasos.length; i++) {
            newcasosNum.push(parseInt(newcasos[i]))
            if (i == newcasos.length - 1) {
                //console.log(newcasosNum)
            }
        }
        let movavg = []
        for (let i = 0; i < newcasosNum.length - 6; i++) {
            movavg.push([i, (newcasosNum[i] + newcasosNum[i + 1] + newcasosNum[i + 2] + newcasosNum[i + 3] + newcasosNum[i + 4] + newcasosNum[i + 5] + newcasosNum[i + 6] + newcasosNum[i + 7]) / 7])
            if (i == newcasosNum.length - 7) {
                //console.log(movavg)
            }
        }


        var data = new google.visualization.DataTable();
        data.addColumn('number', "Days");
        data.addColumn('number', 'Mexico');

        data.addRows(movavg);

        var options = {
            colors: ["green"],
            hAxis: {
                title: '# of Days since the 100th Case'
            },
            vAxis: {
                title: 'New Deaths per Day (7 Day Rolling Average)'
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("graficaNuevosdeathsMX"));
        chart.draw(data, options);
    }

    //New cases daily Mov-Avg Poland

    function newCasesPLavg(newcasos) {
        //console.log(deathMX)
        let newcasosNum = []
        for (let i = 0; i < newcasos.length; i++) {
            newcasosNum.push(parseInt(newcasos[i]))
            if (i == newcasos.length - 1) {
                //console.log(newcasosNum)
            }
        }
        let movavg = []
        for (let i = 0; i < newcasosNum.length - 6; i++) {
            movavg.push([i, (newcasosNum[i] + newcasosNum[i + 1] + newcasosNum[i + 2] + newcasosNum[i + 3] + newcasosNum[i + 4] + newcasosNum[i + 5] + newcasosNum[i + 6]) / 7])
            if (i == newcasosNum.length - 7) {
                //console.log(movavg)
            }
        }


        var data = new google.visualization.DataTable();
        data.addColumn('number', "Days");
        data.addColumn('number', 'Poland');

        data.addRows(movavg);

        var options = {
            colors: ["red"],
            hAxis: {
                title: '# of Days since the 100th Case'
            },
            vAxis: {
                title: 'New Cases per Day (7 Day Rolling Average)'
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("graficaNuevoscasosPL"));
        chart.draw(data, options);
    }

    //New deaths daily Mov-Avg Poland

    function newDeathsPLavg(newcasos) {
        //console.log(deathMX)
        let newcasosNum = []
        for (let i = 0; i < newcasos.length; i++) {
            newcasosNum.push(parseInt(newcasos[i]))
            if (i == newcasos.length - 1) {
                //console.log(newcasosNum)
            }
        }
        let movavg = []
        for (let i = 0; i < newcasosNum.length - 6; i++) {
            movavg.push([i, (newcasosNum[i] + newcasosNum[i + 1] + newcasosNum[i + 2] + newcasosNum[i + 3] + newcasosNum[i + 4] + newcasosNum[i + 5] + newcasosNum[i + 6] + newcasosNum[i + 7]) / 7])
            if (i == newcasosNum.length - 7) {
                //console.log(movavg)
            }
        }


        var data = new google.visualization.DataTable();
        data.addColumn('number', "Days");
        data.addColumn('number', 'Poland');

        data.addRows(movavg);

        var options = {
            colors: ["red"],
            hAxis: {
                title: '# of Days since the 100th Case'
            },
            vAxis: {
                title: 'New Deaths per Day (7 Day Rolling Average)'
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("graficaNuevosdeathsPL"));
        chart.draw(data, options);
    }

    //Gráfica de las pruebas por semana grafica Polonioa

    function testingPerdatePoland(testingPL) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', "Date");
        data.addColumn('number', 'Poland');

        data.addRows(testingPL);

        var options = {
            animation: {
                startup: true,
                duration: 1000,
            },
            colors: ["red"],
            hAxis: {
                title: 'Date of Report',
            },
            vAxis: {
                title: 'Total Test Performed',
                format:"short"
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("graficatestingPL"));
        chart.draw(data, options);

    }

    function testingPer1MPoland(testing1MPL) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', "Date");
        data.addColumn('number', 'Poland');

        data.addRows(testing1MPL);

        var options = {
            colors: ["red"],
            hAxis: {
                title: 'Date of Report'
            },
            vAxis: {
                title: 'Test per 1M Population',
                format:"short"
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("grafica1MPL"));
        chart.draw(data, options);
    }

    function testingPerdateMX(testingMX) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', "Date");
        data.addColumn('number', 'Mexico');

        data.addRows(testingMX);

        var options = {
            colors: ["green"],
            hAxis: {
                title: 'Date of Report'
            },
            vAxis: {
                title: 'Total Test Performed',
                format:"short"
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("graficatestingMX"));
        chart.draw(data, options);

    }

    function testingPer1MMX(testing1MMX) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', "Date");
        data.addColumn('number', 'Mexico');

        data.addRows(testing1MMX);

        var options = {
            colors: ["green"],
            hAxis: {
                title: 'Date of Report'
            },
            vAxis: {
                title: 'Test per 1M Population',
                format:"short"
            },
            legend: {
                position: "top"
            },
            chartArea: { width: "75%" },


        };

        var chart = new google.visualization.LineChart(document.getElementById("grafica1MMX"));
        chart.draw(data, options);
    }



})