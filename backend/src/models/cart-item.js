const Sequelize = require("sequelize");

class cartItem extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                itemId:DataTypes.INTEGER,
                itemName:DataTypes.STRING,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
                deletedAt:DataTypes.DATE,
            },
            {
                tableName: 'cart_Item',
                sequelize
            }
        );
    }    
}

module.exports = cartItem;