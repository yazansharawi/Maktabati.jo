const models = require("../../models");
const BookStore = models.bookStore;
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");

async function createStore(req, res) {
  try {
    const ownerUuid = req.params.uuid;
    const { name, email, website, numOfEmployees, shopNumber, address } =
      req.body;

    const newBookStore = await BookStore.create({
      bookStoreUuid: uuidv4(),
      name,
      email,
      website,
      numOfEmployees,
      shopNumber,
      address,
      ownerUuid,
    });

    const response = {
      email: newBookStore.email,
      address: newBookStore.address,
      name: newBookStore.name,
      website: newBookStore.website,
      bookStoreUuid: newBookStore.bookStoreUuid,
      shopNumber: newBookStore.shopNumber,
    };

    const token = generateToken(newBookStore);


    res.json({
      success: true,
      message: "BookStore record created successfully",
      data: response,
      token:token
    });
  } catch (error) {
    console.error("Error creating bookStore record:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create bookStore record" });
  }
}

function generateToken(book) {
  const Key = process.env.JWT_SECRET || secretKey;
  const token = jwt.sign(
    {
      id: book.id,
      email: book.email,
    },
    Key,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

module.exports = {
  createStore,
};
