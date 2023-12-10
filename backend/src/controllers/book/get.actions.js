const models = require("../../models");
const Book = models.book;
const Author = models.author;
const Tags = models.tags;
const inThisBook = models.inThisBook;
const topics = models.topics;
const Review = models.Review;
const User = models.User;

async function getBooksByGenre(req, res) {
  const requestedGenres = req.params.genre.split(",");

  try {
    const books = await Book.findAll({
      include: {
        model: Author,
        attributes: ["name"],
      },
      where: {
        genre: {
          [models.Sequelize.Op.in]: requestedGenres,
        },
      },
    });

    const categorizedBooks = {};
    books.forEach((book) => {
      const genre = book.genre;
      if (!categorizedBooks[genre]) {
        categorizedBooks[genre] = [];
      }
      categorizedBooks[genre].push({
        id: book.id,
        image: book.image,
        bookRating: book.bookRating,
        price: book.price,
        title: book.title,
        author: book.author
          ? {
              name: book.author.name,
              image: book.author.image,
            }
          : null,
      });
    });

    return res.send(categorizedBooks);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function getBookById(req, res) {
  try {
    const book = await Book.findOne({
      include: [
        {
          model: Author,
          attributes: ["name", "image", "shortBrief"],
        },
        {
          model: inThisBook,
          attributes: ["description"],
        },
        {
          model: topics,
          attributes: ["topic"],
        },
        {
          model: Review,
          attributes: ["comment"],
          include: [
            {
              model: User,
            },
          ],
          limit: 3,
          order: [
            ["createdAt", "DESC"],
            ["rating", "DESC"],
            ["updatedAt", "DESC"],
          ],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!book) {
      return res.status(404).send("Book not found");
    }

    const rating = Math.floor(book.bookRating * 2) / 2;

    const tags = await Tags.findAll({
      where: {
        rateToGet: rating,
      },
      limit: 2,
    });

    book.tags = tags;

    return res.send({ book, tags });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function getBestSellersBooks(req, res) {
  try {
    const books = await Book.findAll({
      where: {
        isBestSeller: 1,
      },
      limit: 10,
      include: {
        model: Author,
        attributes: ["name"],
      },
    });
    return res.send(books);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function getBookWithOffer(req, res) {
  try {
    const books = await Book.findAll({
      where: {
        hasOffer: 1,
      },
      limit: 10,
      include: {
        model: Author,
        attributes: ["name"],
      },
    });
    return res.send(books);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function getBooks(req,res){
  try {
    console.log("hi")
    return
    return res.send(books);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

module.exports = {
  getBooksByGenre,
  getBookById,
  getBestSellersBooks,
  getBookWithOffer,
  getBooks
};
