import React from 'react';
import { FaUserCircle, FaLocationArrow, FaClipboardCheck, FaListAlt, FaChartLine, FaHistory, FaCog, FaBell, FaStar } from 'react-icons/fa';
 
const AgentDashboardDark = () => {
  // Mock data for demonstration
  const agentName = "Alex Sharma";
  const agentRating = 4.8;
  const totalDeliveries = 1523;
  const completedToday = 12;
  const pendingTasks = 3;
  const notifications = [
    { id: 1, message: "New delivery request: Order #12345", type: "new", time: "2 mins ago" },
    { id: 2, message: "Route update for Order #12342", type: "update", time: "15 mins ago" },
  ];
  const nextDelivery = {
    orderId: "ORD-98765",
    customer: "Priya Singh",
    address: "B-201, Orchid Apartments, Anna Nagar",
    items: "2x Pizza, 1x Coke",
    eta: "15 min",
  };
 
  return (
<div className="min-h-screen bg-gray-900 p-8 font-sans text-gray-100">
      {/* Header Section */}
<header className="flex items-center justify-between mb-10 pb-4 border-b border-gray-700">
<h1 className="text-4xl font-extrabold text-white flex items-center">
<FaLocationArrow className="text-green-400 mr-4 text-5xl" /> Agent Hub
</h1>
<div className="flex items-center space-x-4">
<button className="relative p-3 rounded-full bg-gray-800 text-gray-400 shadow hover:bg-gray-700 transition-colors">
<FaBell className="text-xl" />
            {notifications.length > 0 && (
<span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
</button>
<div className="flex items-center">
<FaUserCircle className="text-4xl text-gray-500 mr-3" />
<div>
<p className="font-semibold text-lg">{agentName}</p>
<p className="text-sm text-gray-400 flex items-center">
<FaStar className="text-yellow-400 mr-1" /> {agentRating}
</p>
</div>
</div>
</div>
</header>
 
      {/* Main Content Grid */}
<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 
        {/* Deliveries Summary Card */}
<div className="bg-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
<div className="flex items-center mb-4">
<FaClipboardCheck className="text-4xl text-green-400 mr-4" />
<h2 className="text-2xl font-bold text-white">Your Performance</h2>
</div>
<div className="space-y-3">
<p className="text-lg flex justify-between items-center text-gray-200">
              Total Deliveries: <span className="font-semibold text-2xl text-white">{totalDeliveries}</span>
</p>
<p className="text-lg flex justify-between items-center text-gray-200">
              Completed Today: <span className="font-semibold text-2xl text-blue-400">{completedToday}</span>
</p>
<p className="text-lg flex justify-between items-center text-gray-200">
              Pending Tasks: <span className="font-semibold text-2xl text-orange-400">{pendingTasks}</span>
</p>
</div>
</div>
 
        {/* Next Delivery Card */}
<div className="bg-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 lg:col-span-2 border border-gray-700">
<div className="flex items-center mb-4">
<FaListAlt className="text-4xl text-blue-400 mr-4" />
<h2 className="text-2xl font-bold text-white">Current Assignment</h2>
</div>
          {nextDelivery ? (
<div className="space-y-3">
<p className="text-lg text-gray-200">
<span className="font-semibold">Order ID:</span> {nextDelivery.orderId}
</p>
<p className="text-lg text-gray-200">
<span className="font-semibold">Customer:</span> {nextDelivery.customer}
</p>
<p className="text-lg text-gray-200">
<span className="font-semibold">Address:</span> {nextDelivery.address}
</p>
<p className="text-lg text-gray-200">
<span className="font-semibold">Items:</span> {nextDelivery.items}
</p>
<p className="text-xl font-bold text-blue-400">
                ETA: <span className="text-green-400">{nextDelivery.eta}</span>
</p>
<button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md">
                View Route & Details
</button>
</div>
          ) : (
<p className="text-lg text-gray-400">No active assignment.</p>
          )}
</div>
 
        {/* Quick Actions Card */}
<div className="bg-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
<div className="flex items-center mb-4">
<FaChartLine className="text-4xl text-yellow-400 mr-4" />
<h2 className="text-2xl font-bold text-white">Your Tools</h2>
</div>
<div className="grid grid-cols-2 gap-4">
<button className="flex flex-col items-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow-md text-gray-200">
<FaTruck className="text-3xl text-green-400 mb-2" />
<span className="text-md font-semibold">Go Online</span>
</button>
<button className="flex flex-col items-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow-md text-gray-200">
<FaHistory className="text-3xl text-indigo-400 mb-2" />
<span className="text-md font-semibold">Trip History</span>
</button>
<button className="flex flex-col items-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow-md text-gray-200">
<FaBell className="text-3xl text-orange-400 mb-2" />
<span className="text-md font-semibold">Alerts</span>
</button>
<button className="flex flex-col items-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow-md text-gray-200">
<FaCog className="text-3xl text-gray-400 mb-2" />
<span className="text-md font-semibold">Account</span>
</button>
</div>
</div>
 
        {/* Recent Notifications Card */}
<div className="bg-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 md:col-span-2 border border-gray-700">
<div className="flex items-center mb-4">
<FaBell className="text-4xl text-orange-400 mr-4" />
<h2 className="text-2xl font-bold text-white">Notifications Log</h2>
</div>
          {notifications.length > 0 ? (
<ul className="space-y-3">
              {notifications.map((notif) => (
<li key={notif.id} className="p-3 border border-gray-700 rounded-md bg-gray-700 flex justify-between items-center text-gray-200">
<span className="text-gray-200">{notif.message}</span>
<span className="text-sm text-gray-400">{notif.time}</span>
</li>
              ))}
</ul>
          ) : (
<p className="text-lg text-gray-400">No new alerts.</p>
          )}
</div>
</main>
</div>
  );
};
 
export default AgentDashboardDark;