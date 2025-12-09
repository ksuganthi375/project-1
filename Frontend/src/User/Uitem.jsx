import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';

const Uitem = () => {
    const [item, setItem] = useState(null); 

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/item/${id}`)
            .then((resp) => {
              console.log("ID from params:", id);
                console.log(resp);
                setItem(resp.data); 
            })
            .catch(() => {
                console.log("Did not get data");
            });
    }, [id]);

return (
  <div className="min-h-screen bg-[#f6f0e4] text-[#3e3a32]">
    <Unavbar />
    <div className="max-w-6xl mx-auto px-6 py-10">
      {item && (
        <div className="space-y-8">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={`http://localhost:4000/${item?.itemImage}`}
              alt={`${item.itemtype} Image`}
              className="h-[450px] object-contain rounded-lg shadow-md border border-[#e0d6c2]"
            />
          </div>

        
          {/* <h1 className="text-center text-3xl font-serif tracking-wide">
            {item.itemtype} - {item._id.slice(3, 7)}
          </h1> */}

          <div className="flex flex-col md:flex-row gap-10 justify-between">
            {/* Description */}
            <div className="md:w-1/2 bg-[#fffdf6] p-6 rounded-lg shadow border border-[#e7ddc9]">
              <h2 className="text-lg font-semibold text-[#5a5243] mb-2">Description</h2>
              <hr className="border-[#bda88e] mb-4" />
              <p className="text-base leading-relaxed">{item.description}</p>
            </div>

            {/* Book Info */}
            <div className="md:w-1/2 bg-[#fffdf6] p-6 rounded-lg shadow border border-[#e7ddc9]">
              <h2 className="text-lg font-semibold text-[#5a5243] mb-2">Info</h2>
              <hr className="border-[#bda88e] mb-4" />
              <p className="text-base"><strong>Title:</strong> {item.title}</p>
              <p className="text-base"><strong>Author:</strong> {item.author}</p>
              <p className="text-base"><strong>Genre:</strong> {item.genre}</p>
              <p className="text-base"><strong>Price:</strong> ₹{item.price}</p>
              <p className="text-base"><strong>Seller:</strong> {item.sellerName}</p>
            </div>
          </div>

          {/* Buy Button */}
          <div className="flex justify-center">
            <Link to={`/orderitem/${item._id}`}>
              <button className="bg-[#a77b4a] hover:bg-[#8f6333] text-white px-6 py-2 rounded-lg shadow font-medium transition-all">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default Uitem;
