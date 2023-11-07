const Sequelize = require("sequelize");

class book extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                title: DataTypes.STRING,
                publisher:DataTypes.STRING,
                publicationYear:DataTypes.INTEGER,
                genre:DataTypes.STRING,
                language:DataTypes.STRING,
                summary:DataTypes.STRING,
                price:DataTypes.DOUBLE,
                quantity:DataTypes.INTEGER,
                isBestSeller:DataTypes.BOOLEAN,
                hasOffer:DataTypes.BOOLEAN,
                topicId:DataTypes.INTEGER,
                inThisBookId:DataTypes.INTEGER,
                authorId:DataTypes.INTEGER,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
            },
            {
                tableName: 'books',
                sequelize
            }
        );
    }    
}

module.exports = book;