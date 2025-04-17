import prisma from "../../prisma/prisma.js";

class CollectionModel {
  // Obter todas as coleções
  async findAll() {
  const colecoes = await prisma.collection.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      cards: true,
    },
  });

  return colecoes;
}

  // Obter um anime pelo ID
  async findById(id) {
    const anime = await prisma.anime.findUnique({
      where: {
        id: Number(id),
      },  
    });

    return anime;
  }

  // Criar uma nova coleção
  async create(name, description, releaseYear,) {
    const newCollection = await prisma.collection.create({
      data: {
        name,
        description,
        releaseYear,
      },
    });

    return newCollection;
  }

  // Atualizar um anime
  async update(
    id,
    title,
    description,
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
  ) {
    const anime = await this.findById(id);

    if (!anime) {
      return null;
    }

    // Atualize o anime existente com os novos dados
    const data = {};
    if (title !== undefined) {
      data.title = title;
    }
    if (description !== undefined) {
      data.description = description;
    }
    if (episodes !== undefined) {
      data.episodes = episodes;
    }
    if (releaseYear !== undefined) {
      data.releaseYear = releaseYear;
    }
    if (studio !== undefined) {
      data.studio = studio;
    }
    if (genres !== undefined) {
      data.genres = genres;
    }
    if (rating !== undefined) {
      data.rating = rating;
    }
    if (imageUrl !== undefined) {
      data.imageUrl = imageUrl;
    }

    const animeUpdate = await prisma.anime.update({
      where: {
        id: Number(id),
      },
      data,
    });
    
    return anime;
  }

  // Remover um anime
  async delete(id) {
    const anime = this.findById(id);
    if (!anime) {
      return null;
    }

    await prisma.anime.delete({
      where: {
        id: Number(id)
      },
    });
    return true;
  }
}

export default new CollectionModel();
