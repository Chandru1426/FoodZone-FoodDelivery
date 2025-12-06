import { createContext, useEffect, useState } from "react";
import { food_list as local_food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState(local_food_list); // initially local data
  const [cartItems, setCartItems] = useState({});

  // ✅ Fetch food items from backend and add to local list
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((item) => ({
          ...item,
          _id: String(item.id || item._id), // normalize id as _id
        }));
        setFoodList([...local_food_list, ...updatedData]);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // const StoreContextProvider = (props) => {
  //   const [food_list, setFoodList] = useState([]);
  //   const [cartItems, setCartItems] = useState({});
  
  //   useEffect(() => {
  //     fetch("http://localhost:8080/api/products")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const updatedData = data.map((item) => ({
  //           ...item,
  //           _id: String(item.id || item._id),
  //         }));
  //         setFoodList(updatedData);
  //       })
  //       .catch((err) => console.error("Failed to fetch products:", err));
  //   }, []);


  
  // ✅ Cart Functions
  const addToCart = (itemId) => {
    const id = String(itemId);
    if (!cartItems[id]) {
      setCartItems((prev) => ({ ...prev, [id]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    const id = String(itemId);
    if (cartItems[id] === 1) {
      const newCartItems = { ...cartItems };
      delete newCartItems[id];
      setCartItems(newCartItems);
    } else {
      setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    for (const itemId in cartItems) {
      totalQuantity += cartItems[itemId];
    }
    return totalQuantity;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => String(product._id) === String(item));
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
