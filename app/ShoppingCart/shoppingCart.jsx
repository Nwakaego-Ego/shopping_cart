"use client";
import { useReducer } from "react";
import { FaEdit } from "react-icons/fa";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "Add_to_cart":
      return { ...state, cartItem: [...state.cartItem, action.payload] };
    case "Edit":
      return { ...state, editItem: [...state.edit, action.payload] };
    default:
      console.log(error);
  }
};

const shoppingCart = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    cartItem: [],
    editItem: [],
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

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

  const cartLog = (item) => {
    dispatch({ type: "Add_to_cart", payload: item });
  };

  const totalPrice = () => {
    return state.cartItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  function handleUpdate(index, newItem) {
    const editCartItem = [...state.cartItem];
    editCartItem[index] = newItem;
    dispatch({ type: "Edit", payload: editCartItem });
  }

  return (
    <>
      <div>Hello World</div>
      <div>{state.count}</div>
      <button
        onClick={increment}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Increment
      </button>
      <button
        onClick={decrement}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Decrement
      </button>

      {state.cartItem.map((item, index) => {
        return (
          <div key={index}>
            <div>
              {item.name}
              <button
                onClick={() => {
                  const newItem = prompt("Enter a new value ");
                  if (newItem !== null) {
                    handleUpdate(index, newItem);
                  }
                }}
              >
                <FaEdit className="paste" />
              </button>
            </div>
            <div>
              {item.quantity}
              <button
                onClick={() => {
                  const newItem = prompt("Enter a new value ");
                  if (newItem !== null) {
                    handleUpdate(index, newItem);
                  }
                }}
              >
                <FaEdit className="paste" />
              </button>
            </div>
            <div> {item.price}</div>
          </div>
        );
      })}

      <div>Total Price : ${totalPrice()}</div>

      <div>
        {state.products.map((product) => {
          return (
            <div key={product.id}>
              {product.name} {product.quantity} {product.price}
              <button
                onClick={() => cartLog(product)}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default shoppingCart;
