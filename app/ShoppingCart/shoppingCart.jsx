// "use client"
// import { useReducer } from "react";

//  function reducer(state, action) {
//   console.log(action.type);
// }

// const initialState = { name: "Taylor", age: 42 };

// export default function Form() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   function handleClick() {
//     dispatch({ type: "button click" });
//   }

//   function handleMouseMove() {
//     dispatch({ type: "mouse move" });
//   }

//   return (
//     <button onClick={handleClick} onMouseMove={handleMouseMove}>
//       Click Me in Responsive Mode
//     </button>
//   );
// }

import React, { useState, useEffect } from "react";

const IconList = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/icons");
        const data = await response.json();
        setIcons(data);
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Most Used Icons</h1>
      <ul>
        {icons.map((icon, index) => (
          <li key={index}>{icon.iconName}</li>
        ))}
      </ul>
    </div>
  );
};

export default IconList;
