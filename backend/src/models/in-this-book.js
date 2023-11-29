const Sequelize = require("sequelize");

class inThisBook extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        description: DataTypes.STRING,
        bookId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      },
      {
        tableName: "in_this_book",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.book, { foreignKey: "bookId" });
  }
}

module.exports = inThisBook;
