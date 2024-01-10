const Sequelize = require("sequelize");

class bookStore extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        website: DataTypes.STRING,
        booksRented: DataTypes.INTEGER,
        booksSold: DataTypes.INTEGER,
        numOfEmployees: DataTypes.INTEGER,
        numOfBranches: DataTypes.INTEGER,
        booksRentedCurrently: DataTypes.INTEGER,
        revenue: DataTypes.DOUBLE,
        bookStoreRating: DataTypes.DOUBLE,
        totalExpenses: DataTypes.DOUBLE,
        totalRevenue: DataTypes.DOUBLE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        shopNumber: DataTypes.STRING,
        bookStoreUuid: DataTypes.STRING,
        address: DataTypes.STRING,
        ownerUuid: DataTypes.STRING,
      },
      {
        tableName: "book_store",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "ownerUuid", as: "owner" });
  }
}

module.exports = bookStore;
