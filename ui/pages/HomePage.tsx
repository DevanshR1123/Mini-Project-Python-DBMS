import React, { ChangeEventHandler, useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}
interface Customer {
  id: number;
  fname: string;
  lname: string;
}

const HomePage = () => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [Qty, setQty] = useState({});
  const [Purchase, setPurchase] = useState(undefined);
  const [Customer, setCustomer] = useState({});

  const getProducts = async () => {
    let res = await fetch("http://127.0.0.1:3001/all/products");
    let data = await res.json();
    setProducts(data);
  };

  const updateItem = (id: number, value: string) => {
    setQty(x => ({ ...x, [id]: parseInt(value) }));
  };

  const CustChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCustomer(x => ({ ...x, [name]: value }));
    console.log(Customer);
  };

  const purchase = () => {
    console.log(Customer);
    console.log(Qty);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='homepage page'>
      {Products.map(x => (
        <Card product={x} key={x.id} updateFunc={updateItem} />
      ))}
      <div className='customer-form'>
        <label htmlFor='#cust_id'>Customer ID: </label>
        <input type='number' name='id' id='cust_id' onChange={CustChange} />
        <label htmlFor='#fname'>First Name: </label>
        <input type='text' name='first_name' id='fname' onChange={CustChange} />
        <label htmlFor='#lname'>Last Name: </label>
        <input type='text' name='last_name' id='lname' onChange={CustChange} />
      </div>
      <input
        type='submit'
        value='Purchase'
        className='purchase-btn'
        onClick={purchase}
      />
      {Purchase ? <div className='purchase-invoice'></div> : null}
    </div>
  );
};

const Card = ({
  product,
  updateFunc,
}: {
  product: Product;
  updateFunc: Function;
}) => {
  const { id, name, category, price } = product;
  return (
    <div className='card'>
      <h2 className='card-text'>
        {name.toUpperCase()}
        <span className='category-text'> {category}</span>
      </h2>
      <h3>₹{price}</h3>
      <input
        type='number'
        className='qty-input'
        defaultValue={0}
        min={0}
        name={`item:${id}`}
        onChange={e => updateFunc(id, e.target.value)}
      />
    </div>
  );
};

export default HomePage;
