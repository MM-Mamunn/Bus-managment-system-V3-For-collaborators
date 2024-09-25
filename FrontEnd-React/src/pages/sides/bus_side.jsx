
import { Link, NavLink } from "react-router-dom";
import "../CSS/main2.css";
function Bus_side() {
  return (
    <>
     
     <div className="bg-cover bg-center  min-h-screen flex flex-col items-center justify-top p-2" > 
    
     <ul id= "trip_side" >
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/bus_home/bus_view"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Show All Buses
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/bus_home/bus_delete"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Delete Bus
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/bus_home/oil_countt"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
      Count Consumed Oil
              </NavLink>
  </li>
  {/* <li className="  px-1 py-1 rounded m-4 ">
  <NavLink
                to="/bus_home/total_distance"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-1   font-bold"
                    : ""
                }
              >
      Count distance
              </NavLink>
  </li> */}
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/bus_home/bus_update"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
      Update Bus
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/bus_home/efficiency"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
      Efficiency
              </NavLink>
  </li>
</ul>
</div>
    </>
  );
}

export default Bus_side;
