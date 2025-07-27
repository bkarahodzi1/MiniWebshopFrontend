import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import ShopLayout from "../../components/shop/ShopLayout"
import {useProducts} from "../../contexts/ProductContext"
import {useCart} from "../../contexts/CartContext"

export default function ShopProductDetails() {
  const {id} = useParams()
  const navigate = useNavigate()
  const {getProduct} = useProducts()
  const {addToCart} = useCart()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function fetchProduct (id) {
      const foundProduct = await getProduct(id)
      if (foundProduct) {
        setProduct(foundProduct)
        setQuantity(1) //Reset quantity when product changes
      } else {
        setTimeout(() => {
          navigate("/") //Redirect after 3 seconds if product not found
        }, 3000)
      }
    }
    fetchProduct(id)
    
  }, [id, getProduct, navigate])

  //Handle adding to cart (only available quantity)
  const handleAddToCart = () => {
    if (product && quantity > 0 && quantity <= product.quantity) {
      addToCart(product, quantity)
      alert(`${quantity} x ${product.name} added to cart!`)
      navigate("/cart")
    } else if (product && quantity > product.quantity) {
      alert(`Only ${product.quantity} items are available in stock.`)
    } else {
      alert("Please select a valid quantity.")
    }
  }

  if (!product) {
    return (
      <ShopLayout>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <p>Loading product details or product not found. Redirecting...</p>
        </div>
      </ShopLayout>
    )
  }

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 md:p-8 lg:flex lg:items-start lg:space-x-8">
          {/* Product Image */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src={product.image_url || "/placeholder.svg?height=500&width=500"}
              alt={product.name}
              className="w-full max-w-md h-auto object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="mt-6 lg:mt-0 lg:w-1/2">
            <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Availability:
                <span className={`font-semibold ml-1 ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.quantity > 0 ? `In Stock (${product.quantity} available)` : "Out of Stock"}
                </span>
              </p>
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Math.min(product.quantity, Number.parseInt(e.target.value) || 1)))
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={product.quantity === 0}
              />
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.quantity === 0}
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-gray-900">Product Information</h2>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.id}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Published Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(product.created_at).toLocaleDateString()}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
