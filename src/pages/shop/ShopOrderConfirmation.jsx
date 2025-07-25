import {useEffect, useState} from "react"
import {useParams, Link} from "react-router-dom"
import ShopLayout from "../../components/shop/ShopLayout"
import {useCart} from "../../contexts/CartContext"

export default function ShopOrderConfirmation() {
  const {id} = useParams()
  const {getOrder} = useCart()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    async function fetchOrder(){
      const foundOrder = await getOrder(id)
      if (foundOrder) {
        setOrder(foundOrder)
      }
    }fetchOrder()
  }, [id, getOrder])

  if (!order) {
    return (
      <ShopLayout>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center py-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-500 text-lg">The order you are looking for does not exist or has expired.</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </ShopLayout>
    )
  }

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 md:p-8 text-center">
            <svg
              className="mx-auto h-16 w-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Order Confirmed!</h1>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Your order ID is: <span className="font-semibold">{order.id}</span>
            </p>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              <div className="mt-4 text-left">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Order Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{new Date(order.created_at).toLocaleString()}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                    <dd className="mt-1 text-lg font-bold text-gray-900">${order.total_price.toFixed(2)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.customer.name}
                      <br />
                      {order.customer.address}
                      <br />
                      {order.customer.city}, {order.customer.zipCode}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Items Ordered</h3>
                <ul role="list" className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                  {order.items.map((item) => (
                    <li key={item.product_id} className="py-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={item.image || "/placeholder.svg?height=50&width=50"}
                          alt={item.name}
                          className="h-12 w-12 rounded-md object-cover mr-4"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue Shopping
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
