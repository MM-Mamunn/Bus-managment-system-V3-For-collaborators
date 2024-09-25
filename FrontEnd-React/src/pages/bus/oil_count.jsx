import axios from "axios";
import Header from "../../components/nav";
import "../CSS/main2.css";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/footer";
import Side from "../sides/side";
import { useParams } from "react-router-dom";
import Bus_side from "../sides/bus_side";
function Oil_count() {
  const id = useParams();
  const [trips, setdrivers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/oil_count?date1=${id.id1}&date2=${id.id2}&limit=1000`)
      .then((res) => {
        setdrivers(res?.data?.data?.users);
        console.log(res);
      })
      .catch((error) => {
        alert("error")
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
                    <th>Bus Id and licence</th>
                    <th>category</th>
                    <th>Total Oil Consumed(Litre)</th>
                    <th>Assign</th>
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
                            <div className="font-bold">{iterate?.bus_id}</div>
                            <div className="text-sm opacity-50">
                              {iterate?.license_no}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{iterate?.category}</td>
                      <td>
                        {iterate?.sum}
                        <br />
                        {/* <span className="badge badge-ghost badge-sm">
                      </span> */}
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          {iterate?.assign}
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

export default Oil_count;
