const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                firstName: DataTypes.STRING,
                lastName:DataTypes.STRING,
                nationality:DataTypes.STRING,
                age:DataTypes.INTEGER,
                phoneNumber:DataTypes.INTEGER,
                email:DataTypes.STRING,
                dateOfBirth:DataTypes.DATE,
                createdAt: DataTypes.DATE,
                updatedAt:DataTypes.DATE,
            },
            {
                tableName: 'users',
                sequelize
            }
        );
    }  
    static associate(models) {
        this.myAssociations = this.hasMany(models.Review, { foreignKey: 'userId' });
        this.myAssociations = this.hasMany(models.purchase, { foreignKey: 'userId' });
        this.myAssociations = this.hasMany(models.shoppingCart, { foreignKey: 'userId' });
        this.myAssociations = this.hasMany(models.post, { foreignKey: 'userId' });
        this.myAssociations = this.hasMany(models.userCommunity, { foreignKey: 'userId' });
        this.myAssociations = this.hasMany(models.order, { foreignKey: 'userId' });
        this.myAssociations = this.hasMany(models.wishList, { foreignKey: 'userId' });
    }  
}

module.exports = User;