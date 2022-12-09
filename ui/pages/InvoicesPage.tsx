import React, { useState, useEffect } from "react";

interface Invoice {
  id: number;
  cust_name: string;
  store_city: string;
  branch: string;
  prod_name: string;
  quantity: number;
  total_amount: number;
}

const InvoicesPage = () => {
  const [Invoices, setInvoices] = useState<Invoice[]>([]);

  const getInvoices = async () => {
    let res = await fetch("http://127.0.0.1:3001/all/invoices");
    let data = await res.json();
    setInvoices(data);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className='invoicespage page'>
      <table className='table'>
        <thead>
          <td>Invoice ID</td>
          <td>Customer Name</td>
          <td>Product</td>
          <td>Quantity</td>
          <td>Store</td>
          <td>Total Amount</td>
        </thead>
        <tbody>
          {Invoices.map(x => (
            <tr>
              <td>{x.id}</td>
              <td>{x.cust_name}</td>
              <td>{x.prod_name}</td>
              <td>{x.quantity}</td>
              <td>
                {x.store_city} Branch {x.branch}
              </td>
              <td>{x.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesPage;
