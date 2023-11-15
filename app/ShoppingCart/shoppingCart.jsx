"use client";

import React, { useReducer, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const reducer = (state, action) => {
  switch (action.type) {
    case "Add_to_cart":
      return { ...state, cartItem: [...state.cartItem, action.payload] };
    case "Edit":
      return { ...state, cartItem: action.payload };
    case "Delete_Cart":
      return { ...state, cartItem: action.payload };
    default:
      console.error("Unknown action type");
      return state;
  }
};

const ShoppingApp = () => {
  const [state, dispatch] = useReducer(reducer, {
    cartItem: [],
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const cartLog = () => {
    const quantity = parseInt(newProduct.quantity, 10);
    const price = quantity * 10;
    const newItem = { ...newProduct, price };
    dispatch({ type: "Add_to_cart", payload: newItem });
    setNewProduct({ name: "", quantity: 0 });
  };

  const totalPrice = () => {
    return state.cartItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleEditName = (index, newItem) => {
    const editCartItemName = [...state.cartItem];
    editCartItemName[index] = { ...editCartItemName[index], name: newItem };
    dispatch({ type: "Edit", payload: editCartItemName });
  };

  const handleEditQuantity = (index, newQuantity) => {
    const editCartItemQuantity = [...state.cartItem];
    editCartItemQuantity[index] = {
      ...editCartItemQuantity[index],
      quantity: newQuantity,
      price: newQuantity * 10,
    };
    dispatch({ type: "Edit", payload: editCartItemQuantity });
  };

  const handleDelete = (index) => {
    const updateItem = state.cartItem.filter((item, i) => i !== index);
    dispatch({ type: "Delete_Cart", payload: updateItem });
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-lg">
      <div className="text-3xl font-bold mb-4">Shopping App</div>

      <div className="grid grid-cols-3 gap-4">
        {state.cartItem.map((item, index) => (
          <div key={index} className="border p-4 rounded-md">
            <div className="mb-2">
              <span className="font-bold">{item.name}</span>
              <button
                onClick={() => {
                  const newItem = prompt("Enter a new item....");
                  if (newItem !== null) {
                    handleEditName(index, newItem);
                  }
                }}
                className="ml-2 text-blue-500"
              >
                <FaEdit className="inline" />
              </button>
            </div>

            <div className="mb-2">
              {item.quantity}
              <button
                onClick={() => {
                  const newQuantity = prompt("Enter a new quantity....");
                  if (newQuantity !== null) {
                    handleEditQuantity(index, newQuantity);
                  }
                }}
                className="ml-2 text-blue-500"
              >
                <FaEdit className="inline " />
              </button>
            </div>
            <div className="mb-2">Price: ${item.price}</div>
            <div>
              <button onClick={() => handleDelete(index)}>
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="text-xl font-bold">Total Price: ${totalPrice()}</div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
        <label className="block mb-2">Product:</label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
        <label className="block my-2">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
        <button
          onClick={cartLog}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-5"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ShoppingApp;
