// import React, { useContext, useState } from "react";
// import { StoreContext } from "../context/StoreContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
 
// const Login = () => {
//   const { login, logout, user } = useContext(StoreContext); // Access login, logout, and user from context
//   const [data, setData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
 
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };
 
//   // const onLogin = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const role = await login(data.email, data.password); // Call login from StoreContext
//   //     if (role) {
//   //       if (role === "restaurant") {
//   //         navigate("/restaurant-management"); // Navigate to restaurant dashboard
//   //       } else if (role === "customer") {
//   //         navigate("/"); // Navigate to home for customers
//   //       } else {
//   //         toast.error("Access restricted. Invalid role.");
//   //       }
//   //     } else {
//   //       toast.error("Invalid email or password. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     toast.error("An error occurred during login. Please try again.");
//   //   }
//   // };
 
 
 
//   const onLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const role = await login(data.email, data.password); // Call login from StoreContext
//       if (role) {
//         switch (role) {
//           case "admin":
//             navigate("/"); // Navigate to admin dashboard
//             break;
//           case "restaurant":
//             navigate("/restaurant-management"); // Navigate to restaurant dashboard
//             break;
//           case "customer":
//             navigate("/"); // Navigate to home for c ustomers
//             break;
//           case "agent":
//             navigate("/"); // Navigate to agent dashboard
//             break;
//           default:
//             toast.error("Access restricted. Invalid role.");
//         }
//       } else {
//         toast.error("Invalid email or password. Please try again.");
//       }
//     } catch (error) {
//       toast.error("An error occurred during login. Please try again.");
//     }
//   };
 
 
 
//   const onLogout = () => {
//     logout(); // Call logout from StoreContext
//     navigate("/login"); // Navigate to login page after logout
//   };
 
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         {user ? ( // If user is logged in, show logout button and user details
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h2>
//             <button
//               onClick={onLogout}
//               className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={onLogin}>
//             <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Email</label>
//               <input
//                 name="email"
//                 onChange={onChangeHandler}
//                 value={data.email}
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Password</label>
//               <input
//                 name="password"
//                 onChange={onChangeHandler}
//                 value={data.password}
//                 type="password"
//                 placeholder="Your Password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
//             >
//               Login
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };
 
// export default Login;
 

import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaLock, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Import icons
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Login = () => {
  const { login, logout, user } = useContext(StoreContext); // Access login, logout, and user from context
  const [data, setData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading
    try {
      const role = await login(data.email, data.password); // Call login from StoreContext
      if (role) {
        toast.success(`Welcome ${data.email.split("@")[0]}!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }); // Personalized welcome

        // Navigate based on role after ensuring state update
        setTimeout(() => {
          switch (role) {
            case "admin":
              navigate("/"); // Navigate to admin dashboard
              break;
            case "restaurant":
              navigate("/restaurant-management"); // Navigate to restaurant dashboard
              break;
            case "customer":
              navigate("/"); // Navigate to customer home
              break;
            case "agent":
              navigate("/"); // Navigate to agent dashboard
              break;
            default:
              toast.error("Access restricted. Invalid role.");
          }
        }, 100); // Delay navigation slightly to ensure state update
      } else {
        toast.error("Invalid email or password. Please check your credentials.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }); // More descriptive error
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred during login. Please try again later.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const onLogout = () => {
    logout(); // Call logout from StoreContext
    toast.info("You have been logged out.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    }); // Info toast on logout
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-800 via-purple-900 to-gray-900 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-90 relative overflow-hidden">
        {/* Decorative Circles/Blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-300 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>

        {user ? (
          <div className="text-center py-6 relative z-10">
            <FaUserCircle className="text-5xl text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-lg text-gray-600 mb-6">You are logged in as {user.email}</p>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 text-lg font-semibold shadow-md hover:shadow-lg"
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </button>
          </div>
        ) : (
          <form onSubmit={onLogin} className="relative z-10">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
              Sign In
            </h2>
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                <FaUserCircle className="inline-block mr-2 text-indigo-500" /> Email Address
              </label>
              <input
                id="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-800 text-base shadow-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                <FaLock className="inline-block mr-2 text-indigo-500" /> Password
              </label>
              <input
                id="password"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-800 text-base shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting} // Disable button during submission
            >
              {isSubmitting ? (
                <>
                  <FaSignInAlt className="animate-pulse mr-3" /> Logging in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="mr-3" /> Login
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;