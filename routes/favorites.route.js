const { Router } = require("express");
const { favoriteController } = require("../controllers/favorite.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();
router.get('/favorites', authMiddleware,  favoriteController.getFavorite );
router.patch('/favorites/:id',authMiddleware, favoriteController.addFavoriteOrDelete);

module.exports = router;