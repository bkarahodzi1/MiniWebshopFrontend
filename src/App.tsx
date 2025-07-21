import { dummyData } from "./data/dummyData"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import ShopLayout from "./pages/shop/ShopLayout";

function App() {
  return (
    <main>
      <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/shop/*" element={<ShopLayout />} />
      </Routes>
    </Router>
      <h1>WebShop</h1>
      <div>
        {dummyData.map(todo => (
          <p key={todo.id}>
            {todo.naziv}
          </p>
        ))}
      </div>
    </main>
  )
}

export default App
