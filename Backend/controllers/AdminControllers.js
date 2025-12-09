const Admin = require("../models/Admin/AdminSchema");
const Seller = require("../models/Seller/SellerSchema")
const Book = require("../models/Seller/BookSchema")
const MyOrders = require('../models/Users/MyOrders');
const User = require("../models/Users/UserSchema");
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && user.password === password) {
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    });
  

    return res.json({
      Status: "Success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } else {
    return res.status(401).json({ Status: "Failed", message: "Invalid email or password" });
  }
};

const AdminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await Admin.findOne({ email });
  if (exist) return res.json("Already have an account");

  const newAdmin = await Admin.create({ name, email, password });
  const token = generateToken(newAdmin._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000
  });
  
  res.status(201).json({
      msg: "Account Created",
      user: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email },
      token
    });
};

const getUsers = async (req, res) => {
  const data = await User.find();
  res.status(200).json(data);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
};

const deleteUserOrder = async (req, res) => {
  await MyOrders.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
};

const deleteUserItem = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
};

const getSellers = async (req, res) => {
  const data = await Seller.find();
  res.status(200).json(data);
};

const deleteSeller = async (req, res) => {
  await Seller.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
};

const getAllOrders = async (req, res) => {
  const data = await MyOrders.find();
  res.status(200).json(data);
};

module.exports = {
  AdminLogin,
  AdminRegister,
  getUsers,
  deleteUser,
  deleteUserOrder,
  deleteUserItem,
  getSellers,
  deleteSeller,
  getAllOrders
};
