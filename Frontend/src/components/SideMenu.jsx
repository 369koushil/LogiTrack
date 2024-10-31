import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-full flex-col justify-between bg-white hidden lg:flex">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              location.pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <img alt="dashboard-icon" src={require("../assets/dashboard-icon.png")} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <Link
            to="/inventory"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              location.pathname === "/inventory" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <img alt="inventory-icon" src={require("../assets/inventory-icon.png")} />
            <span className="text-sm font-medium">Inventory</span>
          </Link>

          <Link
            to="/purchase-details"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              location.pathname === "/purchase-details" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <img alt="purchase-icon" src={require("../assets/supplier-icon.png")} />
            <span className="text-sm font-medium">Purchase Details</span>
          </Link>

          <Link
            to="/sales"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              location.pathname === "/sales" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <img alt="sale-icon" src={require("../assets/supplier-icon.png")} />
            <span className="text-sm font-medium">Sales</span>
          </Link>

          <Link
            to="/manage-store"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              location.pathname === "/manage-store" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <img alt="store-icon" src={require("../assets/order-icon.png")} />
            <span className="text-sm font-medium">Manage Store</span>
          </Link>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="Profile"
            src={localStorageData.imageUrl}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
                {localStorageData.firstName + " " + localStorageData.lastName}
              </strong>

              <span>{localStorageData.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
