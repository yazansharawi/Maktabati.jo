const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "fernando.hodkiewicz78@ethereal.email",
    pass: "pTxDqyCxM8W1xW821K",
  },
});

async function sendVerificationEmail(userEmail, otp) {
  const info = await transporter.sendMail({
    from: '"MaktabtiJo@gmail.com',
    to: userEmail,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  });

  return info;
}

async function sendForgetPasswordOTP(userEmail, otp) {
  const info = await transporter.sendMail({
    from: '"MaktabtiJo@gmail.com',
    to: userEmail,
    subject: "Forget Password OTP Verification",
    text: `Your Forget Password OTP for verification is: ${otp}`,
  });

  return info;
}

async function sendBookRentNumber(userEmail, transNumber) {
  const info = await transporter.sendMail({
    from: '"MaktabtiJo@gmail.com',
    to: userEmail,
    subject: "Book Rent Confirmation",
    text: `Your Transaction Id is: ${transNumber}`,
  });

  return info;
}

module.exports = {
  sendVerificationEmail,
  sendForgetPasswordOTP,
  sendBookRentNumber,
};
