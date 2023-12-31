const Sequelize = require("sequelize");

class rentedBooks extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        bookId: DataTypes.INTEGER,
        userUuid: DataTypes.STRING,
        storeId: DataTypes.INTEGER,
        transactionId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "rented_books",
        sequelize,
      }
    );
  }
  static associate(models) {}
}

module.exports = rentedBooks;
