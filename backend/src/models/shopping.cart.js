const Sequelize = require("sequelize");

class shoppingCart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        userUuid: DataTypes.STRING,
        deletedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        storeId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER,
      },
      {
        tableName: "shopping_cart",
        sequelize,
      }
    );
  }
}

module.exports = shoppingCart;
