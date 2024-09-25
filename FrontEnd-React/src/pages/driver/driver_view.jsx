import axios from "axios";
import Header from "../../components/nav";
import "../CSS/main2.css";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/footer";
import Side from "../sides/side";
import dImage from "../image/bus2.png";
import { Link, NavLink } from "react-router-dom";
import Driver_side from "../sides/driver_side";

function Driver_view() {
  const [drivers, setdrivers] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/driver_view?limit=1000")
      .then((res) => {
        setdrivers(res?.data?.data?.users);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="mainn " style={{ backgroundColor: "#2f2b51" }}>
        <div className="containerr">
          <div className="bx1 box">
            <Side />
          </div>
          <div className="bx2 box">
            <div className="having">
              {drivers?.map((iterate) => (
                <div
                  style={{
                    maxWidth: "20vw",
                    marginLeft: "3px",
                    backgroundColor: "rgb(19, 19, 49)",
                    boxShadow: "3px 2px  8px white",
                  }}
                  class="mt-6 w-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div class="flex justify-end px-4 pt-4">
                    <button
                      id="dropdownButton"
                      data-dropdown-toggle="dropdown"
                      class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                      type="button"
                    >
                      <span class="sr-only">Open dropdown</span>
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                    </button>
                    <div
                      id="dropdown"
                      class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul class="py-2" aria-labelledby="dropdownButton">
                        <li>
                          <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Edit
                          </div>
                        </li>
                        <li>
                          <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Export Data
                          </div>
                        </li>
                        <li>
                          <div class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Delete
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="flex flex-col items-center pb-10">
                    <img
                      class="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={dImage}
                      alt="Bus"
                    />
                    <h5
                      style={{ fontWeight: "900" }}
                      class="mb-1 text-xl font-medium text-white dark:text-white"
                    >
                      {iterate?.name}
                    </h5>
                    <span
                      style={{ color: "grey" }}
                      class="text-sm  dark:text-gray-400"
                    >
                      License: {iterate?.license_no}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Driver_id: {iterate?.driver_id}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Age: {iterate?.age}
                    </span>
                    <div class="flex mt-4 md:mt-6">
                      <Link to={`/trips_home/count_trip/${iterate?.driver_id}`}>
                        <div
                          style={{ marginRight: "2px", width: "130px" }}
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Count Trip
                        </div>
                      </Link>
                      <Link to={`/trips_home/payment/${iterate?.driver_id}`}>
                        <div
                          style={{ marginRight: "2px", width: "130px" }}
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Count Payment
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bx3 box">
            <Driver_side />
          </div>
        </div>
      </div>
      <footer style={{ position: "sticky", top: "100vh", width: "100vw" }}>
        <Footer />
      </footer>
    </>
  );
}

export default Driver_view;
