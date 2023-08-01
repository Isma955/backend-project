// cartController.js

const Cart = require("../models/Cart.model");
const Cloth = require("../models/Cloth.model");
const Order = require("../models/Order.model");

module.exports.cartController = {
  // Получение содержимого корзины пользователя
  getUserCart: async (req, res) => {
    try {
      // Найти корзину пользователя по userId и заполнить информацию о товарах с помощью `populate`
      const data = await Cart.findOne({ userId: req.user.id }).populate({
        path: "cart.cloth",
      });
      res.json(data);
    } catch (error) {
      // Обработка ошибки при получении корзины пользователя
      res.status(500).json({ error: "Ошибка получения корзины пользователя" });
    }
  },

  // Добавление товара в корзину пользователя
  addCloth: async (req, res) => {
    try {
      const { size } = await Cloth.findById(req.params.id);
      const { inStock } = size.find((item) => item.size === req.body.mySize);
      const { cart } = await await Cart.findOne({ userId: req.user.id });

      const haveCartCloth = cart.find(
        (item) =>
          item.cloth.toString() === req.params.id &&
          item.size === req.body.mySize
      );

      if (haveCartCloth) {
        const newCart = cart.map((item) => {
          if (
            item.cloth.toString() === req.params.id &&
            item.size === req.body.mySize
          ) {
            item.amount++;
            return item;
          }
          return item;
        });
        await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: newCart });
        return res.json("Добавлен в корзину");
      }

      await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { $push: { cart: { cloth: req.params.id, size: req.body.mySize } } }
      );
      const updateCart = await Cart.findOne({ userId: req.user.id }).populate(
        "cart.cloth"
      );
      const newCloth = updateCart.cart.pop();
      return res.json(newCloth);
    } catch (error) {
      res.json(`${error}: error add cloth`);
    }
  },

  // Уменьшение количества товара в корзине пользователя
  minusCloth: async (req, res) => {
    try {
      const { cart } = await Cart.findOne({ userId: req.user.id });
      const newCart = cart.map((item) => {
        if (
          item.cloth.toString() === req.params.id &&
          item.size === req.body.mySize
        ) {
          if (item.amount > 1) {
            item.amount--;
          }
          return item;
        }
        return item;
      });
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: newCart });
      res.json("Удален из корзины");
    } catch (error) {
      res.json(`${error}: error add cloth`);
    }
  },

  // Удаление товара из корзины пользователя
  removeCloth: async (req, res) => {
    try {
      const { id } = req.params;
      const { cart } = await Cart.findOne({ userId: req.user.id });

      // Фильтрация корзины, чтобы удалить товар с заданным id и размером
      const newCart = cart.filter(
        (item) => item.cloth.toString() !== id || item.size !== req.body.mySize
      );

      // Сохранить обновленную корзину в базе данных
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: newCart });
      res.json("Товар удален из корзины");
    } catch (error) {
      // Обработка ошибки при удалении товара из корзины
      res
        .status(500)
        .json({ error: "Ошибка при удалении товара с корзины пользователя" });
    }
  },
  buyCloths: async (req, res) => {
    try {
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: [] });
      res.json("Товар куплен")
    } catch (error) {
      // Обработка ошибки при оформлении покупки
      res.status(500).json({ error: "Ошибка при оформлении покупки" });
    }
  },
};
