import { Link } from "react-router-dom";
import {
  FaBus,
  FaRoute,
  FaTripadvisor,
  FaTools,
  FaUserTie,
  FaTachometerAlt,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";
import { useGlobalContext } from "@/context";
import { IoMdClose } from "react-icons/io";
const Side = () => {
  const { showSideBar, setShowSideBar } = useGlobalContext();
  // State to manage which section is open
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className={`w-64 bg-white text-black h-screen overflow-y-auto p-4 shadow-lg fixed top-0 z-40 ${
        showSideBar ? "left-0" : "-left-64"
      } md:left-0 md:pt-24  transition-all duration-300`}
    >
      <div className="flex md:hidden w-fulll justify-center items-center">
        <div className="text-lg  ml-2 my-10 font-bold">
          Bus Management System
        </div>
        <IoMdClose
          className="cursor-pointer"
          onClick={() => setShowSideBar(!showSideBar)}
          size={40}
        />
      </div>

      {/* Dashboard Link */}
      <Link
        to="/"
        className="block mb-6"
        onClick={() => setShowSideBar(!showSideBar)}
      >
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded ">
          <FaTachometerAlt className="text-lg" />
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
      </Link>

      {/* Trips Section */}
      <div className="mb-4">
        <Link
          to="/trips_home/trip_all"
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <FaTripadvisor className="text-lg" />
          <span>Trips</span>
          {/* {openSection === "trips" ? <FaChevronDown /> : <FaChevronRight />} */}
        </Link>
        {/* {openSection === "trips" && (
          <ul className="pl-6">
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/trips_home/trip_all"
              >
                Show All Trips
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/trips_home/search_trip"
              >
                Search Trip
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/trips_home/count_trip"
              >
                Count Trips
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/trips_home/payment"
              >
                Count Payment
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/trips_home/trip_insert"
              >
                Insert New Trip
              </Link>
            </li>
          </ul>
        )} */}
      </div>

      {/* Drivers Section */}

      <div className="mb-4">
        <Link
          to="/drivers_home/driver_view"
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <FaUserTie className="text-lg" />
          <span>Drivers</span>
          {/* {openSection === "trips" ? <FaChevronDown /> : <FaChevronRight />} */}
        </Link>
        {/* <div
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
          onClick={() => toggleSection("drivers")}
        >
          <FaUserTie className="text-lg" />
          <span>Drivers</span>
          {openSection === "drivers" ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        {openSection === "drivers" && (
          <ul className="pl-6">
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/drivers_home/driver_view"
              >
                Show All Drivers
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/drivers_home/driver_insert"
              >
                Insert Driver
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/drivers_home/driver_update"
              >
                Update Driver
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/drivers_home/search_driver"
              >
                Search Driver
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/drivers_home/total_distance"
              >
                Total Distance
              </Link>
            </li>
          </ul>
        )} */}
      </div>

      {/* Buses Section */}
      <div className="mb-4">
        <div
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
          onClick={() => toggleSection("buses")}
        >
          <FaBus className="text-lg" />
          <span>Buses</span>
          {openSection === "buses" ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        {openSection === "buses" && (
          <ul className="pl-6">
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/bus_home/bus_view"
              >
                Show All Buses
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/bus_home/bus_delete"
              >
                Delete Bus
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/bus_home/oil_countt"
              >
                Count Consumed Oil
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/bus_home/bus_update"
              >
                Update Bus
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/bus_home/efficiency"
              >
                Efficiency
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Routes Section */}
      <div className="mb-4">
        <div
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
          onClick={() => toggleSection("routes")}
        >
          <FaRoute className="text-lg" />
          <span>Routes</span>
          {openSection === "routes" ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        {openSection === "routes" && (
          <ul className="pl-6">
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/route/route_view"
              >
                Show All Routes
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Maintenance Section */}
      <div className="mb-4">
        <div
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
          onClick={() => toggleSection("maintenance")}
        >
          <FaTools className="text-lg" />
          <span>Maintenance</span>
          {openSection === "maintenance" ? (
            <FaChevronDown />
          ) : (
            <FaChevronRight />
          )}
        </div>
        {openSection === "maintenance" && (
          <ul className="pl-6">
            <li className="mt-2">
              <Link
                className="block px-2 py-1 hover:bg-gray-200 rounded"
                to="/maintanance/maintanance_view"
              >
                Show All Maintenance
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Side;
