import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de coleções
// GET / colecoes - Listar todas as  colecoes
collectionRouter.get("/", CollectionController.getAllCollections);

// GET /coleções/:id - Obter um anime pelo ID
// collectionRouter.get("/:id", CollectionController.getAnimeById);

// POST /collections - Criar uma nova colecao
collectionRouter.post("/", CollectionController.createCollection);

// PUT /api/collections/:id - Atualizar um anime
// collectionRouter.put("/:id", CollectionController.updateAnime);

// DELETE /api/collections/:id - Remover um anime
// collectionRouter.delete("/:id", CollectionController.deleteAnime);

export default collectionRouter;
