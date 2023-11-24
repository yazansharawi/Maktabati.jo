const Sequelize = require("sequelize");

class tags extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        rateToGet: DataTypes.INTEGER,
        tagName: DataTypes.STRING,
        icon: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      },
      {
        tableName: "tags",
        sequelize,
      }
    );
  }
}

module.exports = tags;
