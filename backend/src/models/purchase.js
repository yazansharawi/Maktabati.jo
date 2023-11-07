const Sequelize = require("sequelize");

class purchase extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                orderId:DataTypes.INTEGER,
                paymentId:DataTypes.INTEGER,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
                userId:DataTypes.INTEGER,
                bookId:DataTypes.INTEGER,
                ratingExperience:DataTypes.INTEGER,
                quantity:DataTypes.INTEGER,
                totalPrice:DataTypes.DOUBLE,
                shippingAddress:DataTypes.STRING,
                orderStatus:DataTypes.STRING,
                paymentAmount:DataTypes.DOUBLE,
                paymentMethod:DataTypes.STRING,
                paymentStatus:DataTypes.STRING,
                orderDate:DataTypes.DATE,
                paidAt:DataTypes.DATE,
            },
            {
                tableName: 'purchase',
                sequelize
            }
        );
    }    
}

module.exports = purchase;