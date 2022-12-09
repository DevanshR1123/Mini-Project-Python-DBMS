import { useState } from "react";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import LocationsPage from "../pages/LocationsPage";
import CustomersPage from "../pages/CustomersPage";
import StocksPage from "../pages/StocksPage";
import InvoicesPage from "../pages/InvoicesPage";
import QueryPage from "../pages/QueryPage";
import About from "../pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/stock' element={<StocksPage />} />
          <Route path='/locations' element={<LocationsPage />} />
          <Route path='/invoices' element={<InvoicesPage />} />
          <Route path='/customers' element={<CustomersPage />} />
          <Route path='/query' element={<QueryPage />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
