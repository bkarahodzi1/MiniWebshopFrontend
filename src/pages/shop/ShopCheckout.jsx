import {useState} from "react"
import {useNavigate} from "react-router-dom"
import ShopLayout from "../../components/shop/ShopLayout"
import {useCart} from "../../contexts/CartContext"

export default function ShopCheckout() {
  const {cart, getTotalPrice, createOrder} = useCart()
  const navigate = useNavigate()

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  })
  const [errors, setErrors] = useState({})

  //Handle editing of user details
  const handleChange = (e) => {
    const {name, value} = e.target
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  //Validate format of input
  const validateForm = () => {
    const newErrors = {}
    if (!customerInfo.name.trim()) newErrors.name = "Name is required"
    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!customerInfo.address.trim()) newErrors.address = "Address is required"
    if (!customerInfo.city.trim()) newErrors.city = "City is required"
    if (!customerInfo.zipCode.trim()) newErrors.zipCode = "Zip Code is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.")
      navigate("/")
      return
    }

    const newOrder = await createOrder(customerInfo)
    navigate(`/order-confirmation/${newOrder.id}`)
  }

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Checkout</h1>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 bg-white shadow sm:rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.name ? "border-red-500" : ""}`}
                      value={customerInfo.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.email ? "border-red-500" : ""}`}
                      value={customerInfo.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.address ? "border-red-500" : ""}`}
                      value={customerInfo.phone}
                      onChange={handleChange}
                    />
                    {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.address ? "border-red-500" : ""}`}
                      value={customerInfo.address}
                      onChange={handleChange}
                    />
                    {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.city ? "border-red-500" : ""}`}
                      value={customerInfo.city}
                      onChange={handleChange}
                    />
                    {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.zipCode ? "border-red-500" : ""}`}
                      value={customerInfo.zipCode}
                      onChange={handleChange}
                    />
                    {errors.zipCode && <p className="mt-2 text-sm text-red-600">{errors.zipCode}</p>}
                  </div>
                </div>

                <div className="sm:col-span-2 pt-5">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cart.length === 0}
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 lg:mt-0 lg:col-span-1 bg-white shadow sm:rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="mt-4">
                <ul role="list" className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item.productId} className="py-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={item.image || "/placeholder.svg?height=50&width=50"}
                          alt={item.name}
                          className="h-10 w-10 rounded-md object-cover mr-4"
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
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Order Total</p>
                    <p>${getTotalPrice().toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
