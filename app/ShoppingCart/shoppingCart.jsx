"use client";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "products":
      return { products: action.payload };
    default:
      console.log(error);
  }
};

const shoppingCart = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
     products = [
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
    }
  ]
  }

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };



  return (
    <>
      <div>Hello World</div>
      <div>{state.count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <div>
        {products.map((product) => {
          return (
            <div key={product.id}>
              {product.}
              <button>Add to cart</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default shoppingCart;
