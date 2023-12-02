const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                firstName: DataTypes.STRING,
                image: DataTypes.STRING,
                lastName: DataTypes.STRING,
                country: DataTypes.STRING,
                age: DataTypes.INTEGER,
                phoneNumber: DataTypes.STRING,
                email: DataTypes.STRING,
                dateOfBirth: DataTypes.DATE,
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
                password: DataTypes.STRING,
                type: DataTypes.STRING,
                uuid: DataTypes.UUID,
                otp:DataTypes.STRING
            },
            {
                tableName: 'users',
                sequelize,
                hooks: {
                    beforeSave: async (user) => {
                        if (user.changed("password")) {
                            const salt = await bcrypt.genSalt(10);
                            user.password = await bcrypt.hash(user.password, salt);
                        }
                    }
                }
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

    validPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = User;
