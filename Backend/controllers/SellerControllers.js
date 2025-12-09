const Seller = require('../models/Seller/SellerSchema');
const Book = require("../models/Seller/BookSchema");
const MyOrders = require('../models/Users/MyOrders');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// --- Seller Login ---
const SellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });

    if (!seller) return res.status(404).json({ message: 'No user found' });

    // NOTE: If you are using Mongoose middleware (pre-save hook) to hash passwords, 
    // you should compare the hashed password here instead of plain text.
    if (seller.password !== password)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(seller._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ // Added return here for explicit exit
      Status: 'Success',
      user: { id: seller._id, name: seller.name, email: seller.email },
    });
  } catch (error) {
    console.error("Seller Login Error:", error);
    return res.status(500).json({ message: 'Login failed' }); // Added return
  }
}

// --- Seller Register (Updated Fix) ---
const SellerRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await Seller.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: 'Already have an account' });
    }

    // NOTE: This assumes Seller.create handles password hashing if needed.
    const newSeller = await Seller.create({ name, email, password });
    const token = generateToken(newSeller._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // FIX: Changed status to 200 OK to prevent frontend misinterpretation of 201
    return res.status(200).json({ 
      Status: "Success",
      message: "Account Created",
      user: { id: newSeller._id, name: newSeller.name, email: newSeller.email },
      token
    });
  } catch (err) {
    console.error("Seller Registration Error:", err);
    return res.status(500).json({ message: 'Signup failed' });
  }
}

// --- Add Book ---
const AddBook = async (req, res) => {
  const { title, author, genre, description, price, sellerId, sellerName } = req.body;
  const itemImage = req.file?.path;

  if (!title || !author || !genre || !price || !sellerId || !itemImage) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const item = new Book({
      title,
      author,
      genre,
      description,
      price,
      itemImage,
      sellerId,
      sellerName,
    });
    await item.save();
    return res.status(201).json(item); // Added return
  } catch (err) {
    console.error("Add Book Error:", err);
    return res.status(400).json({ error: 'Failed to create item' }); // Added return
  }
};

// --- Get Books ---
const getBooks = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Book.find({ sellerId: userId }).sort('position');
    return res.json(tasks); // Added return
  } catch (err) {
    console.error('Error fetching books:', err);
    return res.status(500).json({ error: 'Failed to fetch items' }); // Added return
  }
};

// --- Delete Books ---
const deleteBooks = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    return res.sendStatus(200); // Added return
  } catch (err) {
    console.error("Delete Book Error:", err);
    return res.status(500).json({ error: 'Internal server error' }); // Added return
  }
}

// --- Get Seller Orders ---
const getSellerOrders = async (req, res) => {
  try {
    const tasks = await MyOrders.find({ sellerId: req.params.userId }).sort('position');
    return res.json(tasks); // Added return
  } catch (err) {
    console.error("Get Seller Orders Error:", err);
    return res.status(500).json({ error: 'Failed to fetch orders' }); // Added return
  }
}


module.exports = {
  SellerLogin,
  SellerRegister,
  AddBook,
  getBooks,
  deleteBooks,
  getSellerOrders
}