import React, { useState, useEffect } from "react";

interface Stock {
  prod_name: string;
  store_city: string;
  branch: string;
  stock: number;
}

const StocksPage = () => {
  const [Stocks, setStocks] = useState<Stock[]>([]);

  const getStocks = async () => {
    let res = await fetch("http://127.0.0.1:3001/stock");
    let data = await res.json();
    setStocks(data);
  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <div className='stockspage page'>
      <table className='loc-table table'>
        <thead>
          <td>Product</td>
          <td>Store</td>
          <td>Stock Amount</td>
        </thead>
        <tbody>
          {Stocks.map(x => (
            <tr>
              <td>{x.prod_name}</td>
              <td>
                {x.store_city} Branch {x.branch}
              </td>
              <td>{x.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StocksPage;
