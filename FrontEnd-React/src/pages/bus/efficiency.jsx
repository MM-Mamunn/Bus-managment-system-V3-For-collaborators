import axios from "axios";
import Header from "../../components/nav";
import Footer from "../../components/footer";
import { useState } from "react";
import { useEffect } from "react";
import Side from "../sides/side";
import dImage from "../image/bus2.png";
import Bus_side from "../sides/bus_side";
import { Link, useParams } from "react-router-dom";

function Efficiency() {
  const [bus, setdrivers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/api/efficiency?oil=${id}&limit=1000`)
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
             Efficiency
            </button>


            <div style = {{width:"200vw",marginLeft: "1vw",marginTop: "5px",marginBottom: "5px"}}className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
                <div 
                  className="bg-stone-300 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <h2 style={{color:"#161674"}} className="text-2xl font-semibold mb-4">
                    How it calculates?
                  </h2>
                  <p>
                   Efficiency means cost per passenger to travel per Kilometer.<br></br>
                   Efficiency = ((maintanance cost + oil cost)/ totall passengers) / (Average distance traveled by per passenger) <br></br>
                   Driver salary will be included.
                  </p>
                </div>
                </div>



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
                    <th>Bus ID And Trips</th>
                    <th>Totall Cost</th>
                    <th>Oil Cost</th>
                    <th>Maintanance</th>
                    <th>Totall Passengers</th>
                    <th>Totall distance</th>
                    <th>Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {bus?.map((iterate) => (
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
                            <div className="font-bold">{iterate?.bus_id}</div>
                            <div className="text-sm opacity-50">
                              Trips:{iterate?.cnt < 1 ? '0': iterate?.cnt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{iterate?.totall}(TK)</td>
                      <td>
                        {iterate?.c1}(TK)
                        <br />
                        {/* <span className="badge badge-ghost badge-sm">
                      </span> */}
                      </td>
                      <td>
                        {iterate?.c2}(TK)
                        <br />
                        {/* <span className="badge badge-ghost badge-sm">
                      </span> */}
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          {/* {iterate?.eff} */}
                           {iterate?.totall_seats < 1 ? '0': iterate?.totall_seats}
                        </button>
                      </th>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          {/* {iterate?.eff} */}
                          { iterate?.dis2}(KM)
                        </button>
                      </th>
                      <th>
                        <button style={{color:"orange"}} className="btn btn-ghost btn-xs">
                          {/* {iterate?.eff} */}
                          { iterate?.eff >= 9999 ? 'Infinity' : 
                          iterate?.totall == 0 && iterate?.cnt < 1 ? 'No data Yet' : iterate?.eff + '(TK)'}
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
            <Bus_side />
          </div>
        </div>
      </div>
      <footer style={{ position: "sticky", top: "100vh", width: "100vw" }}>
        <Footer />
      </footer>
    </>
  );
}

export default Efficiency;
