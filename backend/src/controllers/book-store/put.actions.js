const models = require("../../models");
const bookStore = models.bookStore;

async function updateBookStoreData(req, res) {
  try {
    const bookStoreUuid = req.params.uuid;
    const { name, shopNumber, email, address } = req.body;

    const updated = await bookStore.update(
      { name, shopNumber, email, address },
      { where: { bookStoreUuid: bookStoreUuid } }
    );

    if (!updated) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Bookstore not found or update failed",
        });
    }

    res.json({ success: true, message: "Bookstore updated successfully" });
  } catch (error) {
    console.error("Error updating bookstore data:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update bookstore data" });
  }
}

module.exports = {
  updateBookStoreData,
};
