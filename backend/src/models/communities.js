const Sequelize = require("sequelize");

class communities extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                description:DataTypes.STRING,
                name:DataTypes.STRING,
                members:DataTypes.INTEGER,
                posts:DataTypes.INTEGER,
                private:DataTypes.BOOLEAN,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
                deletedAt:DataTypes.DATE,
            },
            {
                tableName: 'communities',
                sequelize
            }
        );
    }    
}

module.exports = communities;