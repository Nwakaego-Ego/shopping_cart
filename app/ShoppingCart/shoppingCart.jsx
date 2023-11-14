"use client";
import React, { useReducer, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const reducer = (state, action) => {
  switch (action.type) {
    case "Add_Product":
      return { ...state, products: [...state.products, action.payload] };
    case "Add_to_cart":
      return { ...state, cartItem: [...state.cartItem, action.payload] };
    case "Edit":
      return { ...state, cartItem: action.payload };
    case "Delete_Cart":
      return { ...state, cartItem: action.payload };
    case "Unit_Price":
      return { ...state, products: action.payload };
    default:
      console.error("Unknown action type");
      return state;
  }
};

const ShoppingApp = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    cartItem: [],
    editItem: [],
    deleteItem: [],
    products: [],
    unit: [],
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const [price, setPrice] = useState();

  const handleChange = (e) => {
    if (e.target.name === "quantity") {
      const quantity = parseInt(e.target.value, 10);
      const newPrice = quantity * 10;
      setPrice(newPrice);
      setNewProduct({
        ...newProduct,
        quantity,
      });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const cartLog = () => {
    dispatch({ type: "Add_to_cart", payload: newProduct });
    setNewProduct({ name: "", quantity: 0, price });
  };

  const totalPrice = () => {
    return state.cartItem.reduce(
      (total, item) => total + price * item.quantity,
      0
    );
  };

  const handleEditName = (index, newItem) => {
    const editCartItemName = [...state.cartItem];
    editCartItemName[index] = { ...editCartItemName[index], name: newItem };
    dispatch({ type: "Edit", payload: editCartItemName });
  };

  const handleEditPrice = (index, newPrice) => {
    const editCartItemPrice = [...state.cartItem];
    editCartItemPrice[index] = { ...editCartItemPrice[index], price: newPrice };
    dispatch({ type: "Edit", payload: editCartItemPrice });
  };

  const handleDelete = (index) => {
    const updateItem = state.cartItem.filter((item, i) => i !== index);
    dispatch({ type: "Delete_Cart", payload: updateItem });
  };

  return (
    <>
      <div>Hello World</div>

      {state.cartItem.map((item, index) => (
        <div key={index}>
          <div>
            {item.name}
            <button
              onClick={() => {
                const newItem = prompt("Enter a new item....");
                if (newItem !== null) {
                  handleEditName(index, newItem);
                }
              }}
            >
              <FaEdit className="paste" />
            </button>
          </div>
          {/* <div>
            {item.price}
            <button
              onClick={() => {
                const newPrice = prompt("Enter a new price.....");
                if (newPrice !== null) {
                  handleEditPrice(index, newPrice);
                }
              }}
            >
              <FaEdit className="paste" />
            </button>
          </div> */}
          <div>{price}</div>
          <div>{item.quantity}</div>
          <div>
            <button onClick={() => handleDelete(index)}>
              <FaTrash className="trash" />
            </button>
          </div>
        </div>
      ))}

      <div>Total Price : ${totalPrice()}</div>
      <div>
        <h2>Add a New Product</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
        />
        <button
          onClick={cartLog}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to cart
        </button>
      </div>
    </>
  );
};

export default ShoppingApp;
