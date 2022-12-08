import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/stock'>Stock</Link>
      <Link to='/locations'>Locations</Link>
      <Link to='/invoices'>Invoices</Link>
      <Link to='/query'>Query</Link>
    </nav>
  );
};

export default Navbar;
