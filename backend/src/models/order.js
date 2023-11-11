const Sequelize = require("sequelize");

class order extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                userId: DataTypes.INTEGER,
                storeId:DataTypes.INTEGER,
                status:DataTypes.STRING,
                deletedAt:DataTypes.DATE,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
            },
            {
                tableName: 'order',
                sequelize
            }
        );
    }    
}

module.exports = order;