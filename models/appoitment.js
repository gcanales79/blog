module.exports = function (sequelize, DataTypes) {
    var Appoitment = sequelize.define("Appoitment", {
        name:DataTypes.STRING,
        telefono: DataTypes.STRING,
        fecha: DataTypes.DATE,
        callSID:DataTypes.STRING,
        mensaje:DataTypes.STRING,
        url:DataTypes.STRING,
        preguntas_completas: DataTypes.INTEGER,
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          }
       
    });

    return Appoitment;
}