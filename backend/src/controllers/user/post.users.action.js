const models = require("../../models");
const User = models.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const secretKey = crypto.randomBytes(32).toString("hex");

async function isValidCredentials(email, password) {
  const user = await User.findOne({ where: { email } });
  return user && user.validPassword(password);
}

async function getUserData(email) {
  return await User.findOne({
    where: { email },
    attributes: {
      exclude: ["password", "uuid", "id"],
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const isValid = await isValidCredentials(email, password);

    if (isValid) {
      const user = await getUserData(email);

      if (user) {
        const token = jwt.sign({ email }, secretKey, {
          expiresIn: "1h",
        });
        res.json({ token, user });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createUser(req, res) {
  try {
    const {
      userPassword,
      userFirstName,
      userLastName,
      userEmail,
      userDateOfBirth,
      userType,
      userCountry,
      userPhoneNumber,
    } = req.body;

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const newUser = await User.create({
      password: hashedPassword,
      firstName: userFirstName,
      lastName: userLastName,
      type: userType,
      email: userEmail,
      country: userCountry,
      phoneNumber: userPhoneNumber,
      otp: otp,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: 'fernando.hodkiewicz78@ethereal.email',
        pass: 'pTxDqyCxM8W1xW821K',
      },
    });

    const info = await transporter.sendMail({
      from: '"MaktabtiJo@gmail.com',
      to: userEmail,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`,
    });


    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createUser,
  loginUser,
};
