import { useState } from "react";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import LocationsPage from "../pages/LocationsPage";
import QueryPage from "../pages/QueryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/stock' element={<div>Stocks</div>} />
          <Route path='/locations' element={<LocationsPage />} />
          <Route path='/invoices' element={<div>Invoices</div>} />
          <Route path='/customers' element={<div>Customers</div>} />
          <Route path='/query' element={<QueryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
