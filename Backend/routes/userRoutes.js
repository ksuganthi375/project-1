const express = require("express");
const { loginUser, signupUser, getItems, getSingleItem, createUserOrder, getUserOrders, getUserWishlist, getWishlist, addWishlistItem, removeWishlistItem } = require("../controllers/UsersController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router()

router.post("/login", loginUser);
router.post("/signup", signupUser);

router.get("/item", getItems);
router.get("/item/:id", getSingleItem);

router.post("/userorder",authMiddleware, createUserOrder);
router.get("/getorders/:userId",authMiddleware, getUserOrders);
router.get("/wishlist",authMiddleware, getWishlist);
router.get("/wishlist/:userId",authMiddleware, getUserWishlist);
router.post("/wishlist/add",authMiddleware, addWishlistItem);
router.post("/wishlist/remove",authMiddleware, removeWishlistItem);

module.exports = router
