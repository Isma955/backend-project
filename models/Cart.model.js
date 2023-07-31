const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        require: true,
    },
    cart: [
        {
          cloth: { type: mongoose.SchemaTypes.ObjectId, ref: "Cloth" },
          size: String,
          amount: { type: Number, default: 1 },
        },
      ],
    createdAt: {
        type: Date,
        defaulf: Date.now,
    },
})


const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;