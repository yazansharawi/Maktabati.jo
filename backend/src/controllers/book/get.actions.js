const models = require("../../models");
const Book = models.book;
const Author = models.author;
const Tags = models.tags;
const inThisBook = models.inThisBook;
const topics = models.topics;
const Review = models.Review;
const { Sequelize, Op } = require("sequelize");

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

async function getAllGenres(req, res) {
  try {
    const genres = await Book.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("genre")), "genre"]],
    });
    const distinctGenres = genres.map((book) => book.genre);
    return res.send(distinctGenres);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function getBooks(req, res) {
  try {
    const {
      bookCondition,
      bookRating,
      bookAudience,
      sortBooksBy,
      genre,
      bookAuthor,
    } = req.query;

    let filters = {};

    if (bookCondition) {
      filters.bookCondition = bookCondition;
    }

    if (bookRating) {
      filters.bookRating = bookRating;
    }

    if (bookAudience) {
      let audienceTypes = Array.isArray(bookAudience)
        ? bookAudience
        : [bookAudience];

      if (audienceTypes.includes("Other")) {
        filters.targetedPeople = {
          [Op.and]: [
            { [Op.notLike]: "%Children%" },
            { [Op.notLike]: "%Young Adults%" },
            { [Op.notLike]: "%Adults%" },
          ],
        };
      } else {
        filters.targetedPeople = {
          [Op.or]: audienceTypes.map((type) => ({
            [Op.like]: `%${type}%`,
          })),
        };
      }
    }

    let order = [];
    if (sortBooksBy) {
      sortBooksBy.forEach((sortOption) => {
        switch (sortOption) {
          case "Title (A-Z)":
            order = [["title", "ASC"]];
            break;
          case "Title (Z-A)":
            order = [["title", "DESC"]];
            break;
          case "Best Selling":
            order = [
              ["isBestSeller", "DESC"],
              ["title", "ASC"],
            ];
            break;
          case "Publication date (Newest)":
            order = [["publicationYear", "DESC"]];
            break;
          case "Publication date (Oldest)":
            order = [["publicationYear", "ASC"]];
            break;
          case "Highest Price":
            order = [["price", "DESC"]];
            break;
          case "Lowest Price":
            order = [["price", "ASC"]];
            break;
        }
      });
    }

    if (genre) {
      filters.genre = {
        [Op.in]: genre,
      };
    }

    if (bookAuthor) {
      const author = await Author.findOne({
        where: { name: bookAuthor },
      });

      if (author) {
        filters.authorId = author.id;
      } else {
        return res.json([]);
      }
    }

    const filteredBooks = await Book.findAll({
      where: filters,
      order: order.length > 0 ? order : undefined,
    });

    return res.json(filteredBooks);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function getBookByName(req, res) {
  try {
    const bookName = req.params.bookName;
    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${bookName}%`,
        },
      },
      attributes: ['id', 'title','genre'],
      limit: 10,
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getBooksByGenre,
  getBookById,
  getBestSellersBooks,
  getBookWithOffer,
  getBooks,
  getAllGenres,
  getBookByName,
};
