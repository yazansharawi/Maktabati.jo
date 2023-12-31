const Sequelize = require("sequelize");

class purchase extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                orderId:DataTypes.INTEGER,
                paymentId:DataTypes.INTEGER,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
                userUuid:DataTypes.STRING,
                bookId:DataTypes.INTEGER,
                shippingAddress:DataTypes.STRING,
                orderStatus:DataTypes.STRING,
                paymentAmount:DataTypes.DOUBLE,
                paymentMethod:DataTypes.STRING,
                paymentStatus:DataTypes.STRING,
                paidAt:DataTypes.DATE,
                storeId:DataTypes.STRING,
            },
            {
                tableName: 'purchase',
                sequelize
            }
        );
    }    
}

module.exports = purchase;