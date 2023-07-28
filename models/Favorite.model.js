const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  cloth: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Cloth",
    },
  ],
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
