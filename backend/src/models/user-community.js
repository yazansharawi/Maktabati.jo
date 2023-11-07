const Sequelize = require("sequelize");

class userCommunity extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                userId:DataTypes.INTEGER,
                communityId:DataTypes.INTEGER,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
            },
            {
                tableName: 'user_community',
                sequelize
            }
        );
    }  
}

module.exports = userCommunity;