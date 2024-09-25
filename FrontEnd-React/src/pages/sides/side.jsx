import { Link} from "react-router-dom";
import "../CSS/main2.css";
function Side() {
  return (
    <>
        
      <Link to="/">
      <summary  className="side" style={{listStyle:"none",margin:"5px",height:"30px"}}>
      Home
        </summary>
      </Link>
      <details style={{ margin: "5px" }}>
        <summary className="side" style={{height:"30px"}}>
            Trips
        </summary>
        <ul id="trip_side2" style={{ width: "220px" }}>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/trips_home/trip_all">Show All Trip</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4  ">
            <Link to="/trips_home/search_trip">Search Trip</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/trips_home/count_trip">Count Trips</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/trips_home/payment">Count Payment</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/trips_home/trip_insert">Insert New Trip</Link>
          </li>
          {/* <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/coming_soon">Cancel Trip</Link>
          </li> */}
        </ul>
      </details>
     {/* driver  */}
      <details style={{ margin: "5px" }}>
        <summary className="side" style={{height:"30px"}}>
            Drivers
        </summary>
        <ul id="trip_side2" style={{ width: "220px" }}>
          <li className="  px-4 py-2 rounded m-4  ">
            <Link to="/drivers_home/driver_view">Show All Driver</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/drivers_home/driver_insert">Insert Driver</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/drivers_home/driver_update">Update Driver</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/drivers_home/search_driver">Search Driver</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/drivers_home/total_distance">Total distance </Link>
          </li>
        </ul>
      </details>
    {/* Buses  */}
      <details style={{ margin: "5px" }}>
        <summary className="side" style={{height:"30px"}}>
            Buses
        </summary>
        <ul id="trip_side2" style={{ width: "220px" }}>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/bus_home/bus_view">Show All buses</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4  ">
            <Link to="/bus_home/bus_delete">Delete bus</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/bus_home/oil_countt">Count Consumed Oil</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/bus_home/bus_update">Update bus</Link>
          </li>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/bus_home/efficiency">Efficiency</Link>
          </li>
        </ul>
      </details>
    {/* Routes  */}
      <details style={{ margin: "5px" }}>
        <summary className="side" style={{height:"30px"}}>
            Routes
        </summary>
        <ul id="trip_side2" style={{ width: "220px" }}>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/route/route_view">Show All Route</Link>
          </li>
         
        </ul>
      </details>
    {/* Maintanance  */}
      <details style={{ margin: "5px" }}>
        <summary className="side" style={{height:"30px"}}>
            Maintanance
        </summary>
        <ul id="trip_side2" style={{ width: "220px" }}>
          <li className="  px-4 py-2 rounded m-4 ">
            <Link to="/maintanance/maintanance_view">Show All Maintances</Link>
          </li>
         
        </ul>
      </details>
    </>
  );
}

export default Side;
