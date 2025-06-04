// // import React, { useContext, useEffect, useState } from "react";
// // import { StoreContext } from "../../context/StoreContext";
// // import { toast } from "react-toastify";

// // const Orders = () => {
// //   const { user, token } = useContext(StoreContext); // Access user and token from context
// //   const [orders, setOrders] = useState([]); // State to store orders
// //   const [loading, setLoading] = useState(true); // State to manage loading

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const response = await fetch(
// //           `https://localhost:7274/api/Restaurant/${user.email}`,
// //           {
// //             method: "GET",
// //             headers: {
// //               "Content-Type": "application/json",
// //               Authorization: `Bearer ${token}`, // Include the token
// //             },
// //           }
// //         );

// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.orders && Array.isArray(data.orders)) {
// //             setOrders(data.orders); // Set orders from response
// //             // toast.success("Orders fetched successfully!");
// //           } else {
// //             toast.error("No orders found for this restaurant.");
// //           }
// //         } else {
// //           toast.error("Failed to fetch orders.");
// //         }
// //       } catch (error) {
// //         toast.error("An error occurred while fetching orders.");
// //       } finally {
// //         setLoading(false); // Set loading to false
// //       }
// //     };

// //     if (user?.email) {
// //       fetchOrders();
// //     }
// //   }, [user, token]);

// //   // Handle status update
// //   const updateOrderStatus = async (orderID, status) => {
// //     try {
// //       const response = await fetch(
// //         `https://localhost:7274/api/Order/${orderID}/status`,
// //         {
// //           method: "PATCH",
// //           headers: {
// //             "Content-Type": "application/json-patch+json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: JSON.stringify(status),
// //         }
// //       );

// //       if (response.ok) {
// //         toast.success(`Order status updated to "${status}"!`);
// //         // Update the status locally
// //         setOrders((prevOrders) =>
// //           prevOrders.map((order) =>
// //             order.orderID === orderID ? { ...order, status } : order
// //           )
// //         );
// //       } else {
// //         toast.error("Failed to update order status.");
// //       }
// //     } catch (error) {
// //       console.error("Error updating order status:", error);
// //       toast.error("An error occurred while updating order status.");
// //     }
// //   };

// //   if (loading) {
// //     return <div>Loading orders...</div>;
// //   }

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-2xl mb-4">Orders</h2>
// //       {orders.length > 0 ? (
// //         <ul>
// //           {orders.map((order) => (
// //             <li
// //               key={order.orderID}
// //               className="border p-4 mb-4 rounded-lg shadow-md bg-white"
// //             >
// //               <p>
// //                 <strong>Order ID:</strong> {order.orderID}
// //               </p>
// //               <p>
// //                 <strong>Status:</strong> {order.status}
// //               </p>
// //               <p>
// //                 <strong>Total Amount:</strong> ₹{order.totalAmount}
// //               </p>
// //               <p>
// //                 <strong>Delivery Status:</strong>{" "}
// //                 {order.delivery?.status || "N/A"}
// //               </p>
// //               <p>
// //                 <strong>Customer ID:</strong> {order.customer?.customerID}
// //               </p>
// //               <p>
// //                 <strong>Customer Name:</strong> {order.customer?.name}
// //               </p>
// //               <p>
// //                 <strong>Customer Address:</strong> {order.customer?.address}
// //               </p>
// //               <p>
// //                 <strong>Customer Phone:</strong> {order.customer?.phone}
// //               </p>
// //               <p>
// //                 <strong>Items:</strong>
// //               </p>
// //               <ul className="pl-4">
// //                 {order.orderMenuItems.map((item) => (
// //                   <li key={item.itemID}>
// //                     {item.menuItem.name} - ₹{item.menuItem.price}
// //                   </li>
// //                 ))}
// //               </ul>
// //               <div className="mt-4">
// //                 {/* <button
// //                   onClick={() => updateOrderStatus(order.orderID, "inprogress")}
// //                   className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 mr-2"
// //                 >
// //                   In Progress
// //                 </button> */}
// //                 <button
// //                   onClick={() => updateOrderStatus(order.orderID, "completed")}
// //                   className="bg-orange-500 text-white py-1 px-4 rounded-lg hover:bg-orange-600 mr-2"
// //                 >
// //                   Ready to Pickup
// //                 </button>
              
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p>No orders available.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Orders;

// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";

// const Orders = () => {
//   const { user, token } = useContext(StoreContext); // Access user and token from context
//   const [orders, setOrders] = useState([]); // State to store active orders
//   const [orderHistory, setOrderHistory] = useState([]); // State to store order history
//   const [loading, setLoading] = useState(true); // State to manage loading

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(
//           `https://localhost:7274/api/Restaurant/${user.email}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`, // Include the token
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           if (data.orders && Array.isArray(data.orders)) {
//             // Filter orders with payment status "Completed"
//             const activeOrders = data.orders.filter(
//               (order) =>
//                 order.payment?.status === "Completed" &&
//                 order.delivery?.status !== "delivered"
//             );
//             const historyOrders = data.orders.filter(
//               (order) => order.delivery?.status === "delivered"
//             );

//             setOrders(activeOrders); // Set active orders
//             setOrderHistory(historyOrders); // Set order history
//           } else {
//             toast.error("No orders found for this restaurant.");
//           }
//         } else {
//           toast.error("Failed to fetch orders.");
//         }
//       } catch (error) {
//         toast.error("An error occurred while fetching orders.");
//       } finally {
//         setLoading(false); // Set loading to false
//       }
//     };

//     if (user?.email) {
//       fetchOrders();
//     }
//   }, [user, token]);

//   // Handle status update
//   const updateOrderStatus = async (orderID, status) => {
//     try {
//       const response = await fetch(
//         `https://localhost:7274/api/Order/${orderID}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json-patch+json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ status }),
//         }
//       );

//       if (response.ok) {
//         toast.success(`Order status updated to "${status}"!`);
//         // Update the status locally
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.orderID === orderID ? { ...order, status } : order
//           )
//         );

//         // Move orders with delivery status "delivered" to history
//         setOrders((prevOrders) =>
//           prevOrders.filter((order) => {
//             if (order.delivery?.status === "delivered") {
//               setOrderHistory((prevHistory) => [...prevHistory, order]);
//               return false; // Remove from active orders
//             }
//             return true; // Keep in active orders
//           })
//         );
//       } else {
//         toast.error("Failed to update order status.");
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       toast.error("An error occurred while updating order status.");
//     }
//   };

//   if (loading) {
//     return <div>Loading orders...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl mb-4">Active Orders</h2>
//       {orders.length > 0 ? (
//         <ul>
//           {orders.map((order) => (
//             <li
//               key={order.orderID}
//               className="border p-4 mb-4 rounded-lg shadow-md bg-white"
//             >
//               <p>
//                 <strong>Order ID:</strong> {order.orderID}
//               </p>
//               <p>
//                 <strong>Status:</strong> {order.status}
//               </p>
//               <p>
//                 <strong>Total Amount:</strong> ₹{order.totalAmount}
//               </p>
//               <p>
//                 <strong>Payment Status:</strong> {order.payment?.status}
//               </p>
//               <p>
//                 <strong>Delivery Status:</strong>{" "}
//                 {order.delivery?.status || "N/A"}
//               </p>
//               <p>
//                 <strong>Customer ID:</strong> {order.customer?.customerID}
//               </p>
//               <p>
//                 <strong>Customer Name:</strong> {order.customer?.name}
//               </p>
//               <p>
//                 <strong>Customer Address:</strong> {order.customer?.address}
//               </p>
//               <p>
//                 <strong>Customer Phone:</strong> {order.customer?.phone}
//               </p>
//               <p>
//                 <strong>Items:</strong>
//               </p>
//               <ul className="pl-4">
//                 {order.orderMenuItems.map((item) => (
//                   <li key={item.itemID}>
//                     {item.menuItem.name} - ₹{item.menuItem.price}
//                   </li>
//                 ))}
//               </ul>
//               <div className="mt-4">
//                 <button
//                   onClick={() => updateOrderStatus(order.orderID, "completed")}
//                   className="bg-orange-500 text-white py-1 px-4 rounded-lg hover:bg-orange-600 mr-2"
//                 >
//                   Ready to Pickup
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No active orders available.</p>
//       )}

//       <h2 className="text-2xl mt-8 mb-4">Order History</h2>
//       {orderHistory.length > 0 ? (
//         <ul>
//           {orderHistory.map((order) => (
//             <li
//               key={order.orderID}
//               className="border p-4 mb-4 rounded-lg shadow-md bg-gray-100"
//             >
//               <p>
//                 <strong>Order ID:</strong> {order.orderID}
//               </p>
//               <p>
//                 <strong>Status:</strong> {order.status}
//               </p>
//               <p>
//                 <strong>Total Amount:</strong> ₹{order.totalAmount}
//               </p>
//               <p>
//                 <strong>Payment Status:</strong> {order.payment?.status}
//               </p>
//               <p>
//                 <strong>Delivery Status:</strong> {order.delivery?.status}
//               </p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No order history available.</p>
//       )}
//     </div>
//   );
// };

// export default Orders;

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Orders = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [orders, setOrders] = useState([]); // State to store active orders
  const [orderHistory, setOrderHistory] = useState([]); // State to store order history
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://localhost:7274/api/Restaurant/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.orders && Array.isArray(data.orders)) {
            // Filter active orders and history orders
            const activeOrders = data.orders.filter(
              (order) =>
                order.payment?.status === "Completed" &&
                order.delivery?.status !== "delivered"
            );
            const historyOrders = data.orders.filter(
              (order) => order.delivery?.status === "delivered"
            );

            setOrders(activeOrders); // Set active orders
            setOrderHistory(historyOrders); // Set order history
          } else {
            toast.error("No orders found for this restaurant.");
          }
        } else {
          toast.error("Failed to fetch orders.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching orders.");
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user, token]);

  // Handle status update
  const updateOrderStatus = async (orderID) => {
    try {
      const response = await fetch(
        `https://localhost:7274/api/Order/${orderID}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify("completed"),
        }
      );

      if (response.ok) {
        toast.success(`Order status updated to "completed"!`);
        // Update the status locally
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderID === orderID ? { ...order, status: "completed" } : order
          )
        );

        // Move orders with delivery status "delivered" to history
        setOrders((prevOrders) =>
          prevOrders.filter((order) => {
            if (order.delivery?.status === "delivered") {
              setOrderHistory((prevHistory) => [...prevHistory, order]);
              return false; // Remove from active orders
            }
            return true; // Keep in active orders
          })
        );
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating order status.");
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Active Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li
              key={order.orderID}
              className="border p-4 mb-4 rounded-lg shadow-md bg-white"
            >
              <p>
                <strong>Order ID:</strong> {order.orderID}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.payment?.status}
              </p>
              <p>
                <strong>Delivery Status:</strong>{" "}
                {order.delivery?.status || "N/A"}
              </p>
              <p>
                <strong>Customer ID:</strong> {order.customer?.customerID}
              </p>
              <p>
                <strong>Customer Name:</strong> {order.customer?.name}
              </p>
              <p>
                <strong>Customer Address:</strong> {order.customer?.address}
              </p>
              <p>
                <strong>Customer Phone:</strong> {order.customer?.phone}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul className="pl-4">
                {order.orderMenuItems.map((item) => (
                  <li key={item.itemID}>
                    {item.menuItem.name} - ₹{item.menuItem.price}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button
                  onClick={() => updateOrderStatus(order.orderID)}
                  className="bg-orange-500 text-white py-1 px-4 rounded-lg hover:bg-orange-600 mr-2"
                >
                  Ready to Pickup
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active orders available.</p>
      )}

      <h2 className="text-2xl mt-8 mb-4">Order History</h2>
      {orderHistory.length > 0 ? (
        <ul>
          {orderHistory.map((order) => (
            <li
              key={order.orderID}
              className="border p-4 mb-4 rounded-lg shadow-md bg-gray-100"
            >
              <p>
                <strong>Order ID:</strong> {order.orderID}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.payment?.status}
              </p>
              <p>
                <strong>Delivery Status:</strong> {order.delivery?.status}
              </p>
              <p>
                <strong>Customer ID:</strong> {order.customer?.customerID}
              </p>
              <p>
                <strong>Customer Name:</strong> {order.customer?.name}
              </p>
              <p>
                <strong>Customer Address:</strong> {order.customer?.address}
              </p>
              <p>
                <strong>Customer Phone:</strong> {order.customer?.phone}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul className="pl-4">
                {order.orderMenuItems.map((item) => (
                  <li key={item.itemID}>
                    {item.menuItem.name} - ₹{item.menuItem.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No order history available.</p>
      )}
    </div>
  );
};

export default Orders;