const Cloth = require("../models/Cloth.model");

module.exports.clothesController = {
  getCloth: async (req, res) => {
    try {
      const clothes = await Cloth.find().populate("category", "-__v");

      res.json(clothes);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getOneCloth: async (req, res) => {
    try {
      const data = await Cloth.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getClothByCategory: async (req, res) => {
    try {
      const data = await Cloth.find({category: req.params.id});
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  deleteCloth: async (req, res) => {
    try {
      const data = await Cloth.findByIdAndDelete(req.params.id);
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addCloth: async (req, res) => {
    try {
      const addingCloth = await Cloth.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.files,
        size: [
          { size: "XS", inStock: 100 },
          { size: "S", inStock: 100 },
          { size: "M", inStock: 100 },
          { size: "L", inStock: 100 },
          { size: "XL", inStock: 100 },
        ],
        discount: req.body.discount,
      });
      res.json(addingCloth)
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
