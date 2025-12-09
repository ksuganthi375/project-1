import { useEffect } from 'react';
import Footer from '../Components/Footer';
import Unavbar from './Unavbar';
// import './uhome.css';
import { useNavigate, Link } from 'react-router-dom';


const Uhome = () => {
  const navigate = useNavigate();

  useEffect(() => {
     const user = JSON.parse(localStorage.getItem("user"));
   if (!user) {
      console.log("No user found in localStorage");
      navigate("/login");
      return;
    }
  }, [])


  const bestsellerBooks = [
    {
      title: 'RICH DAD POOR DAD',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1524451661i/39924789.jpg',
    },
    {
      title: 'THINK AND GROW RICH',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg',
    },
    {
      title: "DON'T LET HER STAY",
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1674147285i/80830635.jpg',
    },
    {
      title: 'KILLING THE WITCHES',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675642559i/65214203.jpg',
    },
  ];

  const topRecommendations = [
    {
      title: 'HARRY POTTER',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1663805647i/136251.jpg',
    },
    {
      title: 'ELON MUSK',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692288251i/122765395.jpg',
    },
    {
      title: 'THE MOSQUITO',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1544102229i/42983957.jpg',
    },
    {
      title: 'JOURNEY ON THE JAMES',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347493537i/1979210.jpg',
    },
  ];

  return (
    <div className="bg-[#f4ecd8] min-h-screen text-[#4b3e2e] font-serif">
      <Unavbar />

      <div className="my-8">
        <h1 className="text-center text-4xl font-bold mb-6">Best Seller</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {bestsellerBooks.map((book, index) => (
            <Link
              key={index}
              to="/uproducts"
              className="w-60 bg-[#fdfaf3] rounded border border-[#e5dcc7] shadow hover:shadow-md transition duration-300"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-80 object-cover rounded-t"
              />
              <div className="p-4 text-center font-semibold text-[#4b3e2e]">
                {book.title}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="my-16">
        <h1 className="text-center text-4xl font-bold mb-6">Top Recommendation</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {topRecommendations.map((book, index) => (
            <Link
              key={index}
              to="/uproducts"
              className="w-60 bg-[#fdfaf3] rounded border border-[#e5dcc7] shadow hover:shadow-md transition duration-300"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-80 object-cover rounded-t"
              />
              <div className="p-4 text-center font-semibold text-[#4b3e2e]">
                {book.title}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );

};

export default Uhome;
