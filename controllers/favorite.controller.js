const Favorite = require("../models/Favorite.model");

module.exports.favoriteController = {
  getFavorite: async (req, res) => {
    try {
      const favorites = await Favorite.findOne({
        userId: req.user.id,
      }).populate("cloth");
      res.json(favorites);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
  addFavoriteOrDelete: async (req, res) => {
    try {
      const { cloth } = await Favorite.findOne({ userId: req.user.id });
      const have = cloth.find((item) => item._id.toString() === req.params.id);

      if (have) {
        await Favorite.findOneAndUpdate(
          { userId: req.user.id },
          {
            $pull: { cloth: req.params.id },
          }
        );
        return res.json("delete cloth");
      }

      const data = await Favorite.findOneAndUpdate(
        { userId: req.user.id },
        {
          $push: { cloth: req.params.id },
        }
      ).populate("cloth");
      res.json(data);
    } catch (error) {
      res.json(`${error}: add favorite error`);
    }
  },
};
