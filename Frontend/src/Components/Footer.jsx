import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#eee8d5] text-[#4b3f2f] py-8 px-4 text-center border-t border-[#d2b48c] mt-auto">
      <div className="flex justify-center mb-4">
        <button
          id="bt"
          className="px-6 py-2 bg-[#8B4513] text-white font-semibold rounded-md hover:bg-[#a0522d] transition duration-300"
        >
          Contact Us
        </button>
      </div>
      <p className="mb-2 italic text-[#5a4a42] max-w-xl mx-auto">
        "Embark on a literary journey with our book haven – where every page turns into an adventure!"
      </p>
      <p className="mb-1">📞 Call At: 127-865-586-67</p>
      <p className="text-sm mt-2">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-[#8B4513]">BookVerse</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;