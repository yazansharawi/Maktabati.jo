const Sequelize = require("sequelize");

class Review extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                userId:DataTypes.INTEGER,
                bookId:DataTypes.INTEGER,
                storeId:DataTypes.INTEGER,
                rating:DataTypes.DOUBLE,
                comment:DataTypes.STRING,
                image:DataTypes.STRING,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
                deletedAt:DataTypes.DATE,
            },
            {
                tableName: 'review',
                sequelize
            }
        );
    }  
}

module.exports = Review;