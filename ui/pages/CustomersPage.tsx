import React, { useState, useEffect } from "react";

interface Customer {
  cust_id: number;
  first_name: string;
  last_name: string;
  gender: string;
}

const CustomersPage = () => {
  const [Customers, setCustomers] = useState<Customer[]>([]);

  const getCustomers = async () => {
    let res = await fetch("http://127.0.0.1:3001/all/customers");
    let data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className='customerspage page'>
      <table className='cust-table table'>
        <thead>
          <td>ID</td>
          <td>Name</td>
          <td>Gender</td>
        </thead>
        {Customers.map(x => (
          <tr>
            <td>{x.cust_id}</td>
            <td>
              {x.first_name} {x.last_name}
            </td>
            <td>{x.gender}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CustomersPage;
