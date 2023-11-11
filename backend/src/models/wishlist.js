const Sequelize = require("sequelize");

class wishList extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                userId: DataTypes.INTEGER,
                deletedAt:DataTypes.DATE,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
            },
            {
                tableName: 'wish_List',
                sequelize
            }
        );
    }    
}

module.exports = wishList;