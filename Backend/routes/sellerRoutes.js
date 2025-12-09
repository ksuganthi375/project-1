const express = require("express");
const { SellerLogin, SellerRegister, AddBook, getBooks, deleteBooks, getSellerOrders } = require("../controllers/SellerControllers");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router()

router.post('/slogin',SellerLogin);
router.post('/ssignup',SellerRegister);

router.post('/items', upload.single('itemImage'),authMiddleware,AddBook);
router.get('/getitem/:userId',authMiddleware, getBooks);
router.post('/itemdelete/:id',authMiddleware,deleteBooks);
router.get('/getsellerorders/:userId',authMiddleware, getSellerOrders);

module.exports = router
