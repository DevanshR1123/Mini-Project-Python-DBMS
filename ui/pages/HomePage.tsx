import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  qty: number;
}
const HomePage = () => {
  const products = [
    { name: "cards", id: 1, qty: 25 },
    { name: "paints", id: 2, qty: 30 },
    { name: "canvas", id: 3, qty: 7 },
    { name: "paintbrush", id: 4, qty: 15 },
  ];

  const [Qty, setQty] = useState({});

  const purchase = () => {
    console.log("Hello");
  };

  return (
    <div className='homepage page'>
      {products.map(x => (
        <Card {...x} key={x.id} />
      ))}

      <input
        type='submit'
        value='Purchase'
        className='purchase-btn'
        onClick={purchase}
      />
    </div>
  );
};

const Card = ({ id, name, qty }: Product) => {
  return (
    <div className='card'>
      <h2>{name.toUpperCase()}</h2>
      <input
        type='number'
        className='qty-input'
        defaultValue={0}
        min={0}
        max={qty}
        name={`item:${id}`}
      />
    </div>
  );
};

export default HomePage;
