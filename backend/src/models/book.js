const Sequelize = require("sequelize");

class book extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        bookQuote: DataTypes.STRING,
        bookRating: DataTypes.DOUBLE,
        publisher: DataTypes.STRING,
        publicationYear: DataTypes.INTEGER,
        genre: DataTypes.STRING,
        language: DataTypes.STRING,
        summary: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        quantity: DataTypes.INTEGER,
        isBestSeller: DataTypes.INTEGER,
        hasOffer: DataTypes.INTEGER,
        topicId: DataTypes.INTEGER,
        inThisBookId: DataTypes.INTEGER,
        authorId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        targetedPeopleText: DataTypes.STRING,
      },
      {
        tableName: "books",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.author, { foreignKey: "authorId" });
    this.hasMany(models.inThisBook, { foreignKey: "bookId" });
    this.hasMany(models.topics, { foreignKey: "bookId" });
    this.hasMany(models.Review, { foreignKey: "bookId" });
  }
}

module.exports = book;
