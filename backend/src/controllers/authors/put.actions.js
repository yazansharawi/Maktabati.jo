const models = require("../../models");
const author = models.author;

async function updateAuthors(req, res) {
  data = [
    {
      id: 7,
      image:
        "https://ucarecdn.com/1c2bf02e-4c39-4429-9456-717078e35354/tarawestoverbrigittelacombe3mb.jpg",
    },
    {
      id: 8,
      image:
        "https://ucarecdn.com/e91afe40-b621-455a-8b4c-e95c2cf87b39/skloot.jpg",
    },
    {
      id: 9,
      image:
        "https://ucarecdn.com/455ddc67-87e0-4d36-b1a7-78f2f889625d/MV5BM2IwYTM0MWEtYzMxYi00YTI1LTlkYWQtZmE5ZGM0NGI2NmYyXkEyXkFqcGdeQXVyNDUzOTQ5MjY_V1_.jpg",
    },
    {
      id: 10,
      image:
        "https://ucarecdn.com/c72b85d0-d0d3-4c50-9489-e14996988702/williamgibson2019photocreditmichaeloshea_custom5fb9f428d27070ea461c6d1778a4fd40493f5292.jpg",
    },
    {
      id: 11,
      image:
        "https://ucarecdn.com/553e99ad-2563-4d68-ade0-cabebebd0919/Dan_Brown_bookjacket_cropped.jpg",
    },
    {
      id: 12,
      image:
        "https://ucarecdn.com/2bbfd0b9-d966-4856-a532-a668ea60ce49/GillianFlynnAmerican.webp",
    },
    {
      id: 13,
      image:
        "https://ucarecdn.com/28218cb4-44d7-46fd-bf44-32c1539f8591/JaneAustenCassandraengravingportrait1810.webp",
    },

    {
      id: 14,
      image:
        "https://ucarecdn.com/35daef6d-7dd1-4ca1-a08f-f1b0e1c5f13b/Diana_Gabaldon_by_Gage_Skidmore.jpg",
    },
    {
      id: 15,
      image:
        "https://ucarecdn.com/c078a577-e454-4bc4-a72b-d1deb3c9b232/pamela_chandler_tolkien1290x366.jpg",
    },
    {
      id: 16,
      image:
        "https://ucarecdn.com/fd201c95-4470-43e8-9703-ec8b0b9a8828/JKRowling2021PhotographyDebraHurfordBrownscaled.jpg",
    },
    {
      id: 17,
      image:
        "https://ucarecdn.com/7f3adb0d-a6ee-4f22-8944-cda7cbbd74a3/3543.webp",
    },
    {
      id: 18,
      image:
        "https://ucarecdn.com/366dd00a-6614-45cb-a669-f2f0df830086/5760.webp",
    },
    {
      id: 19,
      image:
        "https://ucarecdn.com/042d39df-a02d-42ec-b16c-973f9251cd1f/Stephen_HawkingStarChild.jpg",
    },
    {
      id: 20,
      image:
        "https://ucarecdn.com/0a1082fd-bcee-42ac-a811-1861a13f95f1/11HARARI01superJumbo.jpg",
    },
    {
      id: 21,
      image:
        "https://ucarecdn.com/6f23f686-c853-4165-9b50-5ad93f19e1fe/download.jpeg",
    },
    {
      id: 22,
      image:
        "https://ucarecdn.com/723d7480-2524-460a-a7cb-79b50a9e0c03/JonKrauker300x292.jpg",
    },
    {
      id: 23,
      image:
        "https://ucarecdn.com/5ba84f55-11d5-40ad-aa28-1c447c98cf10/kahneman13673contentportraitmobiletiny.webp",
    },
    {
      id: 24,
      image:
        "https://ucarecdn.com/74996a48-1428-4213-a7bb-e2d8f3c0fb4a/ViktorFranklhiresimage1024x1024.jpg",
    },
  ];
  try {
    for (const authorData of data) {
      const { id, image } = authorData;
      await author.update({ image }, { where: { id } });
    }

    return res.status(201).json({ message: "Done" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  updateAuthors,
};
