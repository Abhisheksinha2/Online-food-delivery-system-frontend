// import React, { createContext, useState, useEffect } from "react";
// import { useResolvedPath } from "react-router-dom";

// export const StoreContext = createContext();

// export const StoreContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Store user details
//   const [token, setToken] = useState(localStorage.getItem("token") || null); // Load token from localStorage
//   const [customerID, setCustomerID] = useState(null); // Store customer ID
//   const [cart, setCart] = useState([]); // Store cart items
//   const url = "https://localhost:7274";

//   const login = async (email, password) => {
//     try {
//       // Fetch the token from the backend
//       const response = await fetch("https://localhost:7274/api/Token/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setToken(data.token); // Save the token
//         localStorage.setItem("token", data.token); // Persist token in localStorage

//         if (data.role === "restaurant") {
//           // Fetch restaurant details using the email
//           const restaurantResponse = await fetch(
//             `https://localhost:7274/api/Restaurant/${email}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${data.token}`, // Include the token
//               },
//             }
//           );

//           if (restaurantResponse.ok) {
//             const restaurantData = await restaurantResponse.json();
//             setUser({
//               email,
//               role: data.role,
//               restaurantID: restaurantData.restaurantID, // Save restaurantID
//             });
//             return data.role; // Return the user's role
//           } else {
//             console.error(
//               "Failed to fetch restaurant details:",
//               restaurantResponse.statusText
//             );
//             return null;
//           }
//         } else if (data.role === "customer") {
//           // Fetch customer details using the email
//           const customerResponse = await fetch(
//             `https://localhost:7274/api/Customer/${email}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${data.token}`, // Include the token
//               },
//             }
//           );

//           if (customerResponse.ok) {
//             const customerData = await customerResponse.json();
//             setUser({
//               email,
//               role: data.role,
//               customerID: customerData.customerID, // Save customerID
//             });
//             setCustomerID(customerData.customerID); // Save customerID separately
//             return data.role; // Return the user's role
//           } else {
//             console.error(
//               "Failed to fetch customer details:",
//               customerResponse.statusText
//             );
//             return null;
//           }
//         }
//       } else {
//         console.error("Login failed:", response.statusText);
//         return null;
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       return null;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null); // Clear the token
//     setCustomerID(null); // Clear customer ID
//     setCart([]); // Clear cart
//     localStorage.removeItem("token"); // Remove token from localStorage
//   };

//   const addToCart = (item) => {
//     setCart((prevCart) => [...prevCart, item]);
//   };

//   // Load token from localStorage on initial render
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//     }
//   }, []);

//   return (
//     <StoreContext.Provider
//       value={{ user, token, customerID, cart, login, logout, addToCart, url }}
//     >
//       {children}
//     </StoreContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios"; // Import Axios

// // Create a centralized Axios instance with a base URL
// export const API = axios.create({
//   baseURL: "https://localhost:7274/api", // Base URL for the API
// });

// export const StoreContext = createContext();

// export const StoreContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Store user details
//   const [token, setToken] = useState(localStorage.getItem("token") || null); // Load token from localStorage

//   // Add Axios interceptor to include the Authorization header in all requests
//   useEffect(() => {
//     if (token) {
//       API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       delete API.defaults.headers.common["Authorization"];
//     }
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       // Fetch the token and user role from the backend
//       const { data } = await API.post("/Token/login", { email, password });

//       // Save token and persist it in localStorage
//       setToken(data.token);
//       localStorage.setItem("token", data.token);

//       // Fetch additional user details based on role
//       const userDetails = await fetchUserDetails(data.role, email);
//       setUser(userDetails);

//       return data.role; // Return the user's role
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       return null;
//     }
//   };

//   const fetchUserDetails = async (role, email) => {
//     try {
//       switch (role) {
//         case "restaurant":
//           const restaurantResponse = await API.get(`/Restaurant/${email}`);
//           return {
//             email,
//             role,
//             restaurantID: restaurantResponse.data.restaurantID, // Save restaurantID
//           };

//         case "customer":
//           const customerResponse = await API.get(`/Customer/${email}`);
//           return {
//             email,
//             role,
//             customerID: customerResponse.data.customerID, // Save customerID
//           };

//         default:
//           return { email, role }; // For unknown roles, return basic user details
//       }
//     } catch (error) {
//       console.error("Failed to fetch user details:", error.response?.data || error.message);
//       return null;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null); // Clear the token
//     localStorage.removeItem("token"); // Remove token from localStorage
//   };

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//     }
//   }, []);

//   return (
//     <StoreContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import axios from "axios"; // Import Axios

// Create a centralized Axios instance with a base URL
export const API = axios.create({
  baseURL: "https://localhost:7274/api", // Base URL for the API
});

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Load token from localStorage

  // Add Axios interceptor to include the Authorization header in all requests
  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      // Fetch the token and user role from the backend
      const { data } = await API.post("/Token/login", { email, password });

      // Save token and persist it in localStorage
      setToken(data.token);
      localStorage.setItem("token", data.token);

      // Fetch additional user details based on role
      const userDetails = await fetchUserDetails(data.role, email);
      setUser(userDetails);

      return new Promise((resolve) => {
        resolve(data.role); // Resolve the promise with the user's role
      });
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return null;
    }
  };

  const fetchUserDetails = async (role, email) => {
    try {
      switch (role) {
        case "restaurant":
          const restaurantResponse = await API.get(`/Restaurant/${email}`);
          return {
            email,
            role,
            restaurantID: restaurantResponse.data.restaurantID, // Save restaurantID
          };

        case "customer":
          const customerResponse = await API.get(`/Customer/${email}`);
          return {
            email,
            role,
            customerID: customerResponse.data.customerID, // Save customerID
          };

        default:
          return { email, role }; // For unknown roles, return basic user details
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error.response?.data || error.message);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null); // Clear the token
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <StoreContext.Provider value={{ user, token, login, logout }}>
      {children}
    </StoreContext.Provider>
  );
};