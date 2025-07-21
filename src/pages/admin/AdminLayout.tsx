import { Routes, Route, Link } from "react-router-dom";
import Products from "./Products";

export default function AdminLayout() {
  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <Link to="products" className="text-blue-500">Proizvodi</Link>
        <Link to="orders" className="text-blue-500">Narudžbe</Link>
      </nav>
      <Routes>
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </div>
  );
}
