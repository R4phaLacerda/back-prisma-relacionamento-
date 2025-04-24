import CardModel from "../models/cardModel.js";

class CardController {
  // GET /cartas
  async getAllCards(req, res) {
    try {
      const cartas = await CardModel.findAll();
      res.json(cartas);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
      res.status(500).json({ error: "Erro ao buscar as cartas" });
    }
  }

  // GET/cartas/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const carta = await CardModel.findById(id);

      if (!carta) {
        return res.status(404).json({ error: "Carta não encontrado" });
      }

      res.json(carta);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta!" });
    }
  }

  // POST /cartas
  async createCard(req, res) {
    try {
      // Captura dos dados do corpo da requisição (req.body)
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Verifica se todos os campos foram fornecidos
      if (!name || !rarity || !attackPoints || !defensePoints || !collectionId) {
        return res.status(400).json({ error: "Os campos nome, raridade, pontos de ataque, pontos de defesas e o id da coleção são obrigatórios" });
      }

      // Criar a nova carta
      const newCard = await CardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl, 
        collectionId
      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar carta" });
      }

      res.status(201).json({
        message: "Carta criada com sucesso!",
        newCard,
      });
    } catch (error) {
      console.error("Erro ao criar carta:", error);
      res.status(500).json({ error: "Erro ao criar carta" });
    }
  }

  // PUT/cartas/:id
  async updateCard(req, res) {
    const { id } = req.params;
  
    // Verifica se o corpo da requisição está vazio
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "O corpo da requisição não pode estar vazio" });
    }
  
    const {
      name,
      rarity,
      attackPoints,
      defensePoints,
      imageUrl,
      collectionId,
    } = req.body;
  
    try {
      // Atualizar carta
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );
  
      if (!updatedCard) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }
  
      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar carta:", error);
      res.status(500).json({ error: "Erro ao atualizar carta!" });
    }
  }
  // DELETE /cartas/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover a carta
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Carta não encontrado" });
      }

      res.status(200).json({ 
        message: "Carta removida com sucesso!" 
      });
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover carta" });
    }
  }
}

export default new CardController();
