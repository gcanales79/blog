module.exports = function (sequelize, DataTypes) {
    var Birthday = sequelize.define("Birthday", {
        name:DataTypes.STRING,
        surname: DataTypes.STRING,
        birthday: DataTypes.DATE,
       
    });

    return Birthday;
}