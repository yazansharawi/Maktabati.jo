const Sequelize = require("sequelize");

class bookStore extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: DataTypes.STRING,
                email:DataTypes.STRING,
                website:DataTypes.STRING,
                description:DataTypes.STRING,
                booksRented: DataTypes.INTEGER,
                booksSold: DataTypes.INTEGER,
                numOfEmployees:DataTypes.INTEGER,
                numOfBranches:DataTypes.INTEGER,
                booksRentedCurrently:DataTypes.INTEGER,
                revenue:DataTypes.DOUBLE,
                bookStoreRating:DataTypes.DOUBLE,
                totalExpenses:DataTypes.DOUBLE,
                totalRevenue:DataTypes.DOUBLE,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
            },
            {
                tableName: 'book_store',
                sequelize
            }
        );
    }    
}

module.exports = bookStore;