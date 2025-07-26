import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import {AuthProvider} from "./contexts/AuthContext"
import {CartProvider} from "./contexts/CartContext"
import {ProductProvider} from "./contexts/ProductContext"

//Admin pages
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import ProductList from "./pages/admin/ProductList"
import ProductEntry from "./pages/admin/ProductEntry"
import ProductDetails from "./pages/admin/ProductDetails"
import Orders from "./pages/admin/Orders"
import OrderDetails from "./pages/admin/OrderDetails"
import AdminSettings from "./pages/admin/AdminSettings"

//Shop pages
import ShopHome from "./pages/shop/ShopHome"
import ShopProductDetails from "./pages/shop/ShopProductDetails"
import ShopCart from "./pages/shop/ShopCart"
import ShopCheckout from "./pages/shop/ShopCheckout"
import ShopOrderConfirmation from "./pages/shop/ShopOrderConfirmation"

//Protected route component
const ProtectedRoute = ({children}) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

// Store a timestamp when the page closes
window.addEventListener('beforeunload', function() {
    if (!sessionStorage.getItem('pageReloaded')) {
        localStorage.setItem('shouldClearAfter', Date.now() + 10000);
    }
});

// Check on page load if enough time has passed
window.addEventListener('load', function() {
    const clearTime = localStorage.getItem('shouldClearAfter');
    if (clearTime && Date.now() > parseInt(clearTime)) {
        localStorage.clear();
        localStorage.removeItem('shouldClearAfter');
    }
});

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <ProductList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/new"
                element={
                  <ProtectedRoute>
                    <ProductEntry />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />

              {/* Shop Routes */}
              <Route path="/" element={<ShopHome />} />
              <Route path="/products/:id" element={<ShopProductDetails />} />
              <Route path="/cart" element={<ShopCart />} />
              <Route path="/checkout" element={<ShopCheckout />} />
              <Route path="/order-confirmation/:id" element={<ShopOrderConfirmation />} />

              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
