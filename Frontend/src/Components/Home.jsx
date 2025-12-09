import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fdf6e3] via-[#eee8d5] to-[#f5f5dc] text-[#4b3f2f] flex flex-col font-sans">

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 backdrop-blur-md bg-white/30 shadow-lg z-10 border-b border-[#d2b48c]">
        <h1 className="text-3xl font-extrabold tracking-wide text-[#8B4513] drop-shadow-sm">
          📚 BookVerse
        </h1>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#a30000] transition duration-300 shadow-md"
          >
            User
          </Link>
          <Link
            to="/slogin"
            className="px-4 py-2 bg-[#556B2F] text-white rounded-lg hover:bg-[#6b8e23] transition duration-300 shadow-md"
          >
            Seller
          </Link>
          <Link
            to="/alogin"
            className="px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#b5653d] transition duration-300 shadow-md"
          >
            Admin
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
        <h2 className="text-6xl font-black mb-6 leading-tight text-[#8B4513] animate-fade-in">
          Your Gateway to Infinite Stories
        </h2>
        <p className="text-lg text-[#5a4a42] max-w-2xl mb-8">
          Discover captivating books, connect with passionate sellers, and fuel your love for reading — only at <span className="text-[#4b3f2f] font-semibold">BookVerse</span>.
        </p>
        <Link
          to="/login"
          className="px-8 py-3 bg-gradient-to-r from-[#deb887] to-[#d2b48c] text-[#4b3f2f] font-bold rounded-full hover:scale-105 hover:brightness-110 transition-transform duration-300"
        >
          Start Exploring
        </Link>
      </div>

      {/* Categories */}
      <section className="bg-[#f5f5dc] text-[#4b3f2f] py-16 px-6">
        <h3 className="text-4xl font-bold text-center mb-14 text-[#8B4513]">
          Explore by Category
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Fiction", icon: "📖" },
            { title: "Science", icon: "🔬" },
            { title: "Biographies", icon: "👤" },
            { title: "Children's Books", icon: "🧒" },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#deb887] to-[#d2b48c] rounded-xl p-6 shadow-lg text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl mb-4 animate-bounce">{category.icon}</div>
              <h4 className="text-xl font-semibold">{category.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
