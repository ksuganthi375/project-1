const express = require("express");
const { AdminLogin, AdminRegister, getUsers, deleteUser, deleteUserOrder, deleteUserItem, getAllOrders, deleteSeller, getSellers } = require('../controllers/AdminControllers');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router()

router.post('/alogin',AdminLogin)
router.post('/asignup',AdminRegister)

router.get('/users',authMiddleware,getUsers)
router.delete('/userdelete/:id', authMiddleware, deleteUser)
router.delete('/userorderdelete/:id',authMiddleware,deleteUserOrder)
router.delete('/useritemdelete/:id',authMiddleware,deleteUserItem)
router.get('/sellers',authMiddleware,getSellers)
router.delete('/sellerdelete/:id',authMiddleware, deleteSeller)
router.get('/orders',authMiddleware,getAllOrders)

module.exports = router