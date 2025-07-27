import {Link, useNavigate} from "react-router-dom"
import ShopLayout from "../../components/shop/ShopLayout"
import {useCart} from "../../contexts/CartContext"

export default function ShopCart() {
  const {cart, updateQuantity, removeFromCart, getTotalPrice, clearCart} = useCart()
  const navigate = useNavigate()

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId) => {
    if (window.confirm("Are you sure you want to remove this item from your cart?")) {
      removeFromCart(productId)
    }
  }

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      clearCart()
    }
  }

  const handleCheckout = () => {
    navigate("/checkout")
  }

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Your Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
              <Link
                to="/"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2 bg-white shadow sm:rounded-lg p-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {/* Item details */}
                    {cart.map((item) => (
                      <li key={item.product_id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image || "/placeholder.svg?height=100&width=100"}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/products/${item.productId}`}>{item.name}</Link>
                              </h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center">
                              <label htmlFor={`quantity-${item.productId}`} className="sr-only">
                                Quantity
                              </label>
                              <input
                                type="number"
                                id={`quantity-${item.productId}`}
                                name={`quantity-${item.productId}`}
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleUpdateQuantity(item.productId, Number.parseInt(e.target.value) || 1)
                                }
                                className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                              />
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.productId)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={handleClearCart} className="text-sm font-medium text-red-600 hover:text-red-500">
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Cart details */}
              <div className="mt-8 lg:mt-0 lg:col-span-1 bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                <div className="mt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${getTotalPrice().toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ShopLayout>
  )
}
