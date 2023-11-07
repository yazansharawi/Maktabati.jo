const Sequelize = require("sequelize");

class author extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                image:DataTypes.STRING,
                name:DataTypes.STRING,
                dateOfBirth:DataTypes.DATE,
                shortBrief:DataTypes.STRING,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
                deletedAt:DataTypes.DATE,
            },
            {
                tableName: 'author',
                sequelize
            }
        );
    }    
}

module.exports = author;