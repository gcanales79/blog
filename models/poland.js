module.exports = function (sequelize, DataTypes) {
    var Poland = sequelize.define("Poland", {
        fecha: DataTypes.DATE,
        total_cases:DataTypes.STRING,
        new_cases:DataTypes.STRING,
        total_deaths:DataTypes.STRING,
        new_deaths:DataTypes.STRING,
        total_recovered:DataTypes.STRING,
        total_tests:DataTypes.STRING,
        total_tests_per1m:DataTypes.STRING,
    });

    return Poland;
}