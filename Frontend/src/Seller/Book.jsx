import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Snavbar from './Snavbar';

const Book = () => {
  const [item, setItem] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/item/${id}`) 
      .then((resp) => {
        console.log("Book fetched:", resp.data);
        setItem(resp.data);
      })
      .catch((error) => {
        console.log("Failed to fetch book:", error);
      });
  }, [id]);

  if (!item) {
    return (
      <div>
        <Snavbar />
        <h2 className="text-center mt-10 text-gray-600">Loading book details...</h2>
      </div>
    );
  }

  return (
    <div>
      <Snavbar />
      <br />

      <div style={{ display: "flex", justifyContent: "center", height: "450px" }}>
        <img
          src={`http://localhost:4000/${item.itemImage}`}
          alt={item.title || "Book Image"}
          style={{ maxHeight: "100%", objectFit: "contain" }}
        />
      </div>

      <h1 className="text-center text-2xl font-bold mt-4">
        {item.title} - {item._id.slice(3, 7)}
      </h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', flexWrap: 'wrap' }}>
        <div style={{ width: '40%', minWidth: '300px', marginBottom: '20px' }}>
          <h2 style={{ color: "grey" }}><strong>Description</strong></h2>
          <hr style={{ height: "3px", backgroundColor: "black" }} />
          <p style={{ fontSize: "18px" }}>{item.description}</p>
        </div>

        <div style={{ minWidth: '250px', marginBottom: '20px' }}>
          <h2 style={{ color: "grey" }}><strong>Info</strong></h2>
          <hr style={{ height: "3px", backgroundColor: "black" }} />
          <p style={{ fontSize: "18px" }}>Price: ${item.price}</p>
          <p style={{ fontSize: "18px" }}>Warranty: 1 year</p>
          <p style={{ fontSize: "18px" }}>Seller: {item.userName}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
