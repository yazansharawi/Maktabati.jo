const Sequelize = require("sequelize");

class post extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                userId: DataTypes.INTEGER,
                communityId:DataTypes.INTEGER,
                text:DataTypes.STRING,
                deletedAt:DataTypes.DATE,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
            },
            {
                tableName: 'post',
                sequelize
            }
        );
    }    
}

module.exports = post;