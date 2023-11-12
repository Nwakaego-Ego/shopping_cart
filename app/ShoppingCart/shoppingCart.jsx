"use client";
import { useReducer } from "react";

function reducer(state, action) {
  console.log(action.type);
}

const initialState = { name: "Taylor", age: 42 };

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleClick() {
    dispatch({ type: "button click" });
  }

  function handleMouseMove() {
    dispatch({ type: "mouse move" });
  }

  return (
    <button onClick={handleClick} onMouseMove={handleMouseMove}>
      Click Me in Responsive Mode
    </button>
  );
}
