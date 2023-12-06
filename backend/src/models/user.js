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
        otp: DataTypes.STRING,
        doneOnboarding: DataTypes.BOOLEAN,
        FavoriteGenres: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        FavoriteAuthors: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        FavoriteBookAge: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        FavoriteBookType: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
      },
      {
        tableName: "users",
        sequelize,
        hooks: {
          beforeSave: async (user) => {
            if (user.changed("password")) {
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(user.password, salt);
            }
          },
        },
      }
    );
  }

  static associate(models) {
    this.myAssociations = this.hasMany(models.Review, { foreignKey: "userId" });
    this.myAssociations = this.hasMany(models.purchase, {
      foreignKey: "userId",
    });
    this.myAssociations = this.hasMany(models.shoppingCart, {
      foreignKey: "userId",
    });
    this.myAssociations = this.hasMany(models.post, { foreignKey: "userId" });
    this.myAssociations = this.hasMany(models.userCommunity, {
      foreignKey: "userId",
    });
    this.myAssociations = this.hasMany(models.order, { foreignKey: "userId" });
    this.myAssociations = this.hasMany(models.wishList, {
      foreignKey: "userId",
    });
  }
  async validPassword(password) {
    try {
      const result = await bcrypt.compare(password, this.password);
      return result;
    } catch (error) {
      console.error("Error during bcrypt compare:", error);
      return false;
    }
  }
}

module.exports = User;
