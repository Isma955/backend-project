const { Router } = require('express');
const { cartController }= require ('../controllers/cart.controller')
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get('/user-cart', authMiddleware, cartController.getUserCart)
router.patch('/cart-add/:id', authMiddleware, cartController.addCloth)
router.patch('/cart-minus/:id', authMiddleware, cartController.minusCloth)
router.patch('/cart-remove/:id', authMiddleware, cartController.removeCloth)
router.patch('/buy', authMiddleware, cartController.buyCloths)


module.exports = router



