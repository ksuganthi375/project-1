const User = require("../models/Users/UserSchema");
const Book = require('../models/Seller/BookSchema');
const MyOrders = require('../models/Users/MyOrders');
const WishlistItem = require("../models/Users/Wishlist");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.password !== password) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      Status: "Success",
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Signup
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Already have an account" });

    const newUser = await User.create({ email, name, password });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      msg: "Account Created",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });
  } catch (err) {
    res.status(500).json({ error: "Signup Failed" });
  }
};

// Get all items
const getItems = async (req, res) => {
  try {
    const images = await Book.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get single item
const getSingleItem = async (req, res) => {
  const { id } = req.params;
  try {
   const item = await Book.findById(id).populate('sellerId', 'name email');
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching single item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const createUserOrder = async (req, res) => {
  const { flatno, city, state, pincode, totalamount, BookingDate, description, Delivery, userId, userName, booktitle, bookauthor, bookgenre, itemImage, sellerId } = req.body;

  try {
    const order = new MyOrders({
      flatno,
      city,
      state,
      pincode,
      totalamount,
      sellerId, 
      BookingDate,
      description,
      userId,
      Delivery,
      userName,
      booktitle,
      bookauthor,
      bookgenre,
      itemImage
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: "Failed to create order" });
  }
};


// Get orders by user
const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await MyOrders.find({ userId }).sort("position");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get all wishlist items
const getWishlist = async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getUserWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await WishlistItem.find({ userId }).populate('bookId');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

// Add to wishlist
const addWishlistItem = async (req, res) => {
  const { bookId, title, itemImage, userId, userName } = req.body;
  try {
    const existingItem = await WishlistItem.findOne({ bookId, userId });
    if (existingItem) {
      return res.status(400).json({ msg: "Item already in wishlist" });
    }

    const newItem = new WishlistItem({ bookId, title, itemImage, userId, userName });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Remove from wishlist
const removeWishlistItem = async (req, res) => {
  const { itemId } = req.body;
  try {
    await WishlistItem.findOneAndDelete({ itemId });
    res.json({ msg: "Item removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  loginUser,
  signupUser,
  getItems,
  getSingleItem,
  createUserOrder,
  getUserOrders,
  getWishlist,
  getUserWishlist,
  addWishlistItem,
  removeWishlistItem
};
