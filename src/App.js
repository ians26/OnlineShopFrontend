import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import { fetchProducts, fetchOrder, getOrderById } from './api'
import { Route, Routes } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState(localStorage.getItem('orderId'));
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')));
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  }

  const getOrder = async () => {
    const data = await fetchOrder();
    setOrder(data);
    setOrderId(data.orderId);
    localStorage.setItem('order', JSON.stringify(data));
    localStorage.setItem('orderId', data.orderId);
  }

  const handleUpdateOrder = () => {
    getOrder();
  }
  useEffect(() => {
    getProducts();
  }, [])
  useEffect(() => {
    if (!orderId) {
      getOrder();
    }
  }, [])
  const categories = [...new Set(products.map(product => product.category))];
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }
  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

  return (
    <div>
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />
      <Routes>
        <Route path="/" element={<Home products={filteredProducts} />} />
        <Route path="/cart" element={<Cart onUpdateOrder={handleUpdateOrder} />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
}

export default App;
