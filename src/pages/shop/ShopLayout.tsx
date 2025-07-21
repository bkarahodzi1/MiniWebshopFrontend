import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";

export default function ShopLayout() {
  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <Link to="" className="text-green-500">Početna</Link>
        <Link to="cart" className="text-green-500">Košarica</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
