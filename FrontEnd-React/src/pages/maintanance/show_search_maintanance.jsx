import axios from "axios";
import Header from "../../components/nav";
import "../CSS/main2.css";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/footer";
import Side from "../sides/side";
import Maintanance_side from "../sides/maintanance_side";
import { useParams } from "react-router-dom";

function Show_search_maintanance() {
  const [mnt, setdrivers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/search_maintanance?bus_id=${id}&limit=1000`)
      .then((res) => {
        if(res?.data?.data?.users)
        setdrivers(res?.data?.data?.users);
      else 
      alert(`No maintanance record for bus id ${id}`)
        // console.log(res);
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
                    <th>Driver ID </th>
                    <th>Bus Id</th>
                    <th>Issue</th>
                    <th>Issue Date</th>
                    <th>Estimated Cost</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {mnt?.map((iterate, i) => (
                  <tr key={i}>
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
                            <div className="font-bold">{iterate?.driver_id}</div>
                            <div className="text-sm opacity-50">
                              {/* {iterate?.license_no} */}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{iterate?.bus_id}</td>
                      <td>
                        {iterate?.issue}
                        <br />
                        {/* <span className="badge badge-ghost badge-sm">
                      </span> */}
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          {iterate?.issue_date}
                        </button>
                      </th>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          {iterate?.estimated_cost}
                        </button>
                      </th>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          {iterate?.solved_status}
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
            <Maintanance_side />
            </div>
        </div>
      </div>
      <footer style={{ position: "sticky", top: "100vh", width: "100vw" }}>
        <Footer />
      </footer>
    </>
  );
}

export default Show_search_maintanance;
