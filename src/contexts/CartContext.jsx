import {createContext, useState, useContext, useEffect} from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])

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
  }, [])

  //Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  //CONNECT ME TO THE BACKEND!!!!
  //CONNECT ME TO THE BACKEND!!!!
  //CONNECT ME TO THE BACKEND!!!!
  //CONNECT ME TO THE BACKEND!!!!
  //CONNECT ME TO THE BACKEND!!!!
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
          image: product.image,
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
  const createOrder = (customerInfo) => {
    const newOrder = {
      id: Date.now().toString(),
      items: [...cart],
      customer: customerInfo,
      totalPrice: getTotalPrice(),
      status: "pending",
      date: new Date().toISOString(),
    }

    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders)
    clearCart()

    return newOrder
  }

  //Update order status
  const updateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? {...order, status} : order))
    setOrders(updatedOrders)
  }

  //Get all orders
  const getOrders = () => {
    return orders
  }

  //Get a single order by ID
  const getOrder = (id) => {
    return orders.find((order) => order.id === id)
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
