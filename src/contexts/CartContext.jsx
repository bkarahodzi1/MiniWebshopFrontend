import {createContext, useState, useContext, useEffect} from "react"
import {useProducts} from "./ProductContext"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)
const baseUrl = import.meta.env.VITE_API_URL

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])
  const [didLoadCart, setDidLoadCart] = useState(false)
  const [orders, setOrders] = useState([])
  const {updateProduct} = useProducts()
  const {getProduct} = useProducts()

  useEffect(() => {
    //Load cart from localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }

    //Load orders from localStorage
    const storedOrders = localStorage.getItem("orders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
    setDidLoadCart(true)
  }, [])

  //Update localStorage whenever cart changes
  useEffect(() => {
    if (didLoadCart) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, didLoadCart])


  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  //Add item to cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find((item) => item.productId === product.id)

    if (existingItem) {
      //Update quantity if item already exists
      const updatedCart = cart.map((item) =>
        item.productId === product.id ? {...item, quantity: item.quantity + quantity} : item,
      )
      setCart(updatedCart)
    } else {
      //Add new item
      setCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image_url,
          quantity,
        },
      ])
    }
  }

  //Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const updatedCart = cart.map((item) => (item.productId === productId ? {...item, quantity} : item))
    setCart(updatedCart)
  }

  //Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId)
    setCart(updatedCart)
  }

  //Clear cart
  const clearCart = () => {
    setCart([])
  }

  //Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  //Create a new order
  const createOrder = async (customerInfo) => {
    const newOrder = {
      items: cart.map(item => ({
        product_id: item.productId,
        price: item.price,
        name: item.name,
        image: item.image,
        quantity: item.quantity
      })),
      total_price: getTotalPrice(),
      customer: customerInfo,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    const res = await fetch(`${baseUrl}/orders/`,{
      method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
    const data = await res.json()
    console.log("data:")
    console.log(data)

    data.items.forEach(async item =>{
      const newProduct = await getProduct(item.product_id)
      updateProduct(item.product_id, {quantity: newProduct.quantity - item.quantity})
    })

    const returnOrder = {
      ...newOrder,
      id: data.id
    }

    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders)
    clearCart()

    return returnOrder
  }

  //Update order status
  const updateOrderStatus = (orderId, status) => {
    fetch(`${baseUrl}/orders/${orderId}`,{
      method: "PATCH",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"status": status}),
    })
    const updatedOrders = orders.map((order) => (order.id === orderId ? {...order, status} : order))
    setOrders(updatedOrders)
  }

  //Get all orders
  const getOrders = async (page = 1, filters = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);

    if (filters.customer_name)params.append("customer_name", filters.customer_name);
    if (filters.status)       params.append("status", filters.status);
    if (filters.sort_by)      params.append("sort_by", filters.sort_by);

    const res = await fetch(`${baseUrl}/orders/?${params.toString()}`);
    const data = await res.json();

    setOrders(data.data);
    localStorage.setItem("orders", JSON.stringify(data.data));

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}

  //Get a single order by ID
  const getOrder = async (id) => {
    const res = await fetch(`${baseUrl}/orders/${id}`)
    const data = await res.json()
    return data
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    createOrder,
    updateOrderStatus,
    getOrders,
    getOrder,
  }

  return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}
