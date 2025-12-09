import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snavbar from './Snavbar';

function Addbook() {
  const [formData, setFormData] = useState({
    description: '',
    title: '',
    author: '',
    genre: '',
    price: '',
    itemImage: null,
  });

  const navigate = useNavigate();
  const seller = JSON.parse(localStorage.getItem('seller'));

  const handleChange = (e) => {
    if (e.target.name === 'itemImage') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('itemImage', formData.itemImage);


      formDataToSend.append('sellerId', seller.id);
      formDataToSend.append('sellerName', seller.name);

      await axios.post('http://localhost:4000/items', formDataToSend, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Book added successfully');
      navigate('/myproducts');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="bg-[#f5ecd9] min-h-screen">
      <Snavbar />
      <div className="max-w-md mx-auto mt-8 p-6 border border-[#d6c7a1] rounded shadow-lg bg-[#fcf7ed] text-[#4b3e2b] font-serif">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#3b2f1c]">
          Add Book
        </h2>
        <form onSubmit={handleSubmit}>
          {["title", "author", "genre", "price", "description"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="border border-[#ccbfa4] rounded w-full py-2 px-3 mb-4 bg-[#fffaf3] text-[#3b2f1c] placeholder-[#7e6b52] focus:outline-none focus:ring-2 focus:ring-[#a88e6c]"
              required
            />
          ))}

          <div className="mb-4">
            <label className="block mb-1 text-[#5b4b31] font-medium">
              Item Image
            </label>
            <input
              type="file"
              name="itemImage"
              accept="image/*"
              onChange={handleChange}
              className="border border-[#ccbfa4] rounded w-full py-2 px-3 bg-[#fffaf3] text-[#3b2f1c] file:text-[#3b2f1c] focus:outline-none focus:ring-2 focus:ring-[#a88e6c]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded font-semibold bg-[#8b6f47] hover:bg-[#a78965] text-white focus:outline-none focus:ring-2 focus:ring-[#bda07c]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );

}

export default Addbook;
