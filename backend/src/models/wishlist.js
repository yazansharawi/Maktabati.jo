const Sequelize = require("sequelize");

class wishList extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                userUuid: DataTypes.STRING,
                deletedAt:DataTypes.DATE,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
                bookId:DataTypes.INTEGER,
            },
            {
                tableName: 'wish_List',
                sequelize
            }
        );
    }    
}

module.exports = wishList;