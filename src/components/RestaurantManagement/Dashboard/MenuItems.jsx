import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const MenuItems = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const [editItem, setEditItem] = useState(null); // State to manage the item being edited

  useEffect(() => {
    const fetchMenuItems = async () => {
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
          setMenuItems(data.menuItems); // Set menu items from response
        } else {
          throw new Error("Failed to fetch menu items");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (user?.email) {
      fetchMenuItems();
    }
  }, [user, token]);

  // Handle delete menu item
  const handleDelete = async (itemID) => {
    try {
      const response = await fetch(
        `https://localhost:7274/api/MenuItem/${itemID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );

      if (response.ok) {
        toast.success("Menu item deleted successfully!");
        setMenuItems((prevItems) =>
          prevItems.filter((item) => item.itemID !== itemID)
        ); // Remove the deleted item from the state
      } else {
        toast.error("Failed to delete menu item.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the menu item.");
    }
  };

  // Handle edit menu item using PATCH method
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7274/api/MenuItem/${editItem.itemID}`,
        {
          method: "PATCH", // Use PATCH method
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`, // Include the token
          },
          body: JSON.stringify(editItem), // Send updated item data
        }
      );

      if (response.ok) {
        toast.success("Menu item updated successfully!");
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.itemID === editItem.itemID ? editItem : item
          )
        ); // Update the edited item in the state
        setEditItem(null); // Close the edit form
      } else {
        toast.error("Failed to update menu item.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the menu item.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Menu Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.itemID}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={
                item.imageUrl ||
                "https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg"
              } // Use imageURL or fallback to placeholder image
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-orange-700 font-bold mt-2">₹{item.price}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleDelete(item.itemID)}
                className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setEditItem(item)}
                className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleEdit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Edit Menu Item</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={editItem.description}
                onChange={(e) =>
                  setEditItem((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                value={editItem.price}
                onChange={(e) =>
                  setEditItem((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="block text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={editItem.imageUrl}
                onChange={(e) =>
                  setEditItem((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() =>
                  window.open(`https://www.google.com/search?q=images/${editItem.name}`, "_blank")
                }
                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Search Images
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MenuItems;