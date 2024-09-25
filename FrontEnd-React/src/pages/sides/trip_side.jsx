
import { Link, NavLink } from "react-router-dom";
import "../CSS/main2.css";
function Trip_side() {
  return (
    <>
     
     <div class="bg-cover bg-center  min-h-screen flex flex-col items-center justify-top p-2" > 
    
     <ul id= "trip_side" >
  <li className="  px-1 py-1 rounded m-4 ">
  <NavLink
                to="/trips_home/trip_all"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-1   font-bold"
                    : ""
                }
              >
     Show All Trips
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/trips_home/search_trip"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Search Trip
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/trips_home/count_trip"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Count Trips
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/trips_home/payment"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Count Payment
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/trips_home/trip_insert"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
    Insert New Trip
              </NavLink>
  </li>
  {/* <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/coming_soon"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
    Cancel Trip
              </NavLink>
  </li> */}
</ul>
</div>
    </>
  );
}

export default Trip_side;
