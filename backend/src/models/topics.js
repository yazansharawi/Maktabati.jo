const Sequelize = require("sequelize");

class topics extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        topic:DataTypes.STRING,
        bookId:DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      },
      {
        tableName: "topics",
        sequelize,
      }
    );
  }
}

module.exports = topics;
