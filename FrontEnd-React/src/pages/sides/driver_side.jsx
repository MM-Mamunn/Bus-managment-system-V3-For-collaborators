
import { Link, NavLink } from "react-router-dom";
import "../CSS/main2.css";
function Driver_side() {
  return (
    <>
     
     <div class="bg-cover bg-center  min-h-screen flex flex-col items-center justify-top p-2" > 
    
     <ul id= "trip_side" >
  <li className="  px-1 py-1 rounded m-4 ">
  <NavLink
                to="/drivers_home/driver_view"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-1   font-bold"
                    : ""
                }
              >
     Show all driver
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/drivers_home/driver_insert"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Insert New Driver
              </NavLink>
  </li>
 
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/drivers_home/driver_update"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Update Driver
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/drivers_home/search_driver"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Search Driver
              </NavLink>
  </li>
  <li className="  px-4 py-1 rounded m-4 ">
  <NavLink
                to="/drivers_home/total_distance"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-300 mt-1 mb-1  rounded  p-2   font-bold"
                    : ""
                }
              >
     Total Distance
              </NavLink>
  </li>
</ul>
</div>
    </>
  );
}

export default Driver_side;
