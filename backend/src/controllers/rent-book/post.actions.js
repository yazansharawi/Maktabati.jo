const models = require("../../models");
const User = models.User;
const rentedBooks = models.rentedBooks;
const { sendBookRentNumber } = require("../../services/emailService");

function generateTransactionId(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function addRentedBookToUser(req, res) {
  const userUuid = req.params.uuid;
  const { bookId, startDate, endDate, storeId } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userEmail = user.email;

    const transactionId = generateTransactionId();

    
    const newRental = await rentedBooks.create({
      userUuid,
      bookId,
      startDate,
      endDate,
      storeId,
      transactionId,
    });

    await sendBookRentNumber(userEmail, transactionId);

    res.status(200).json(newRental);
  } catch (error) {
    console.error("Error adding rented book:", error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = {
  addRentedBookToUser,
};
