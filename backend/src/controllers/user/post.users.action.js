const models = require("../../models");
const User = models.User;
const BookStore = models.bookStore;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { internalAxios } = require("../../services/axios");
const { differenceInYears, parse } = require("date-fns");
const secretKey = crypto.randomBytes(32).toString("hex");
const {
  sendVerificationEmail,
  sendForgetPasswordOTP,
} = require("../../services/emailService");

async function isValidCredentials(email, password) {
  const user = await User.findOne({ where: { email } });
  return user && (await user.validPassword(password));
}

async function getUserData(email) {
  return await User.findOne({
    where: { email },
    attributes: {
      exclude: ["password", "id"],
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
        let storeUuid = null;
        if (user.type === 'owner') {
          const bookstore = await BookStore.findOne({
            where: { ownerUuid: user.uuid },
          });
          storeUuid = bookstore.bookStoreUuid
        }


        const token = jwt.sign({ email }, secretKey, {
          expiresIn: "1h",
        });

        const response = {
          uuid: user.uuid,
          user: user,
          storeUuid: storeUuid
        };

        res.json({ token, response });
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

function generateToken(user) {
  const Key = process.env.JWT_SECRET || secretKey;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    Key,
    {
      expiresIn: "1h",
    }
  );
  return token;
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

    const dob = parse(userDateOfBirth, "MM-dd-yyyy", new Date());

    const age = differenceInYears(new Date(), dob);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const newUser = await User.create({
      password: userPassword,
      firstName: userFirstName,
      lastName: userLastName,
      type: userType,
      email: userEmail,
      country: userCountry,
      phoneNumber: userPhoneNumber,
      otp: otp,
      age: age,
      dateOfBirth: userDateOfBirth,
    });
    const token = generateToken(newUser);
    await sendVerificationEmail(userEmail, otp);

    let userUuid = await internalAxios.get("user/by-id/" + newUser.id);

    const userData = {
      uuid: newUser.uuid,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      type: newUser.type,
    };
    res.status(201).json({
      message: "User created successfully",
      userUuid: userUuid.data.uuid,
      user: userData,
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function verifyOtpUserByUuid(req, res) {
  try {
    const userUuid = req.params.uuid;
    const enteredOtp = req.body.otp;

    const user = await User.findOne({ where: { uuid: userUuid } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isOtpValid = enteredOtp === user.otp;

    if (isOtpValid) {
      return res.status(200).json({ verified: true, userType: user.type });
    } else {
      return res.status(200).json({ verified: false });
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function userForgetPassword(req, res) {
  const { userEmail } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const user = await User.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otpSent) {
      return res.status(400).json({ error: "OTP already sent" });
    }

    await sendForgetPasswordOTP(userEmail, otp);

    user.otp = otp;
    user.otpSent = true;
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function resetPassword(req, res) {
  const { userEmail, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    user.password = newPassword;
    user.otpSent = false;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUserInfoByUuid(req, res) {
  const userUuid = req.params.uuid;
  const { firstName, lastName, email, phoneNumber } = req.body.data;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createUser,
  loginUser,
  verifyOtpUserByUuid,
  userForgetPassword,
  resetPassword,
  updateUserInfoByUuid,
};
