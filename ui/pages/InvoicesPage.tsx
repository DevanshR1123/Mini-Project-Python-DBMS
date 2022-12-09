import React, { useState, useEffect } from "react";

interface Invoice {
  city: string;
  branch_count: number;
}

const InvoicesPage = () => {
  const [Invoices, setInvoices] = useState<Invoice[]>([]);

  const getInvoices = async () => {
    let res = await fetch("http://127.0.0.1:3001/all/stores");
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
          <td>City</td>
          <td>No. of Branches</td>
        </thead>
        {Invoices.map(x => (
          <tr>
            <td>{x.city}</td> <td>{x.branch_count}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default InvoicesPage;
