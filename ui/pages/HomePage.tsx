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
    if (name == "id") setCustomer(x => ({ ...x, id: parseInt(value) }));
    else setCustomer(x => ({ ...x, [name]: value }));
  };

  const purchase = async () => {
    //@ts-ignore
    let res = await fetch(`http://127.0.0.1:3001/customer/${Customer.id}`, {
      method: "POST",
      body: JSON.stringify({ customer: Customer, products: Qty }),
    });
    let data = await res.json();
    console.log(data);
    setPurchase(data);
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
        <label htmlFor='#gender'>Gender: </label>
        <input type='text' name='gender' id='gender' onChange={CustChange} />
        <label htmlFor='#city'>City: </label>
        <input type='text' name='city' id='city' onChange={CustChange} />
        <label htmlFor='#branch'>Branch: </label>
        <input type='text' name='branch' id='branch' onChange={CustChange} />
      </div>
      <input
        type='submit'
        value='Purchase'
        className='purchase-btn'
        onClick={purchase}
      />
      {Purchase ? (
        <div className='purchase-invoice'>
          {/*@ts-ignore*/}
          {Purchase.cust_name} bought: <br />
          <ul>
            {/*@ts-ignore*/}
            {Purchase.purchases.map(x => (
              <li>
                {x.qty}x {x.name} for ₹{x.total_amount}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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
