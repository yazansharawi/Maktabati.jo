const Sequelize = require("sequelize");

class shoppingCart extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                userId: DataTypes.INTEGER,
                deletedAt:DataTypes.DATE,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
            },
            {
                tableName: 'shopping_cart',
                sequelize
            }
        );
    }    
}

module.exports = shoppingCart;