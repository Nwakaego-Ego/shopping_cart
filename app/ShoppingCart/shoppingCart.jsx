// "use client";
// import { useReducer } from "react";

// const reducer = (state, action, payload) => {
//   switch (action.type) {
//     case "increment":
//       return { ...state, count: state.count + 1 };
//     case "decrement":
//       return { ...state, count: state.count - 1 };
//     case "products":
//       return { ...state, products: payload.products };
//     default:
//       console.log(error);
//   }
// };

// const shoppingCart = () => {
//   const [state, dispatch] = useReducer(reducer, {
//     count: 0,
//     products: [
//       {
//         name: "coke",
//         quantity: 8,
//         price: 300,
//       },
//       {
//         name: "clothe",
//         quantity: 10,
//         price: 500,
//       },
//       {
//         name: "food",
//         quantity: 12,
//         price: 800,
//       },
//     ],
//   });

//   const increment = () => {
//     dispatch({ type: "increment" });
//   };

//   const decrement = () => {
//     dispatch({ type: "decrement" });
//   };

//   const productList = () => {
//     dispatch({ type: "product", payload: state.products });
//   };

//   return (
//     <>
//       <div>Hello World</div>
//       <div>{state.count}</div>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//       <div>
//         {state.products.map((product) => {
//           return (
//             <div key={product.id}>
//               {product.name} {product.quantity} {product.price}
//               <button onClick={productList}>Add to cart</button>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default shoppingCart;
"use client";

import React, { useReducer } from "react";

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
};

const ShoppingCart = () => {
  // State and dispatch using useReducer
  const [state, dispatch] = useReducer(cartReducer, {
    count: 0,
    cartItems: [],
    products: [
      {
        name: "coke",
        quantity: 8,
        price: 300,
      },
      {
        name: "clothe",
        quantity: 10,
        price: 500,
      },
      {
        name: "food",
        quantity: 12,
        price: 800,
      },
    ],
  });

  // Function to add an item to the cart
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {state.cartItems.map((item, index) => (
          <div key={index}>
            <p>
              {item.name} - Quantity: {item.quantity} - Price: $
              {item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>
      <p>Total Price: ${calculateTotalPrice()}</p>
      {/* Product list */}
      <div>
        <h2>Product List</h2>
        <ul>
          {state.products.map((product, index) => (
            <li key={index}>
              {product.name} - Quantity: {product.quantity} - Price: $
              {product.price}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingCart;
