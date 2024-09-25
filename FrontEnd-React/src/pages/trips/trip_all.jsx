import axios from "axios";
import Header from "../../components/nav";
import "../CSS/main2.css";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/footer";
import Trip_side from "../sides/trip_side";
import Side from "../sides/side";
function Trip_all() {
  const [trips, setdrivers] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/trip_all?limit=1000")
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
            <button
              style={{ marginLeft: "450px" }}
              className="mt-2 btn btn-active"
            >
              All Trips
            </button>
            <div className="overflow-x-auto">
              <table
                style={{
                  color: "white",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                className="table"
              >
                {/* head */}
                <thead>
                  <tr>
                    <th>Name And License</th>
                    <th>Bus Id</th>
                    <th>Route name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {trips?.map((iterate) => (
                    <tr key={iterate?.bus_id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{iterate?.name}</div>
                            <div className="text-sm opacity-50">
                              {iterate?.license_no}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{iterate?.bus_id}</td>
                      <td>
                        {iterate?.route_name}
                        <br />
                        {/* <span className="badge badge-ghost badge-sm">
                      </span> */}
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          {iterate?.date}
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
              </table>

              
            </div>

            {/* end of bx2 */}
          </div>
          <div className="bx3 box">
            {" "}
            <Trip_side />
          </div>
        </div>
      </div>
      <footer style={{ position: "sticky", top: "100vh", width: "100vw" }}>
        <Footer />
      </footer>
    </>
  );
}

export default Trip_all;
