import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/nav";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/footer";
import Trip_side from "../sides/trip_side";
import Side from "../sides/side";

function Show_count_trip() {
  const [drivers, setdrivers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    // console.log(id);
    if (id)
      axios
        .get(`http://127.0.0.1:8000/api/count_trip?driver_id=${id}&limit=1000`)
        .then((res) => {
          // navigate("/result_search_trip")
          console.log(res);
          setdrivers([]);
          if (res?.data?.data?.users) setdrivers(res.data.data.users);
          else alert(`No Trip yet by driver id "${id}", Please go back to search again`);
          //  navigate(`/failed/${1}/${8}`);
          // navigate("/failed");
        })
        .catch((error) => {
          // navigate("/failed");
          // navigate(`/failed`);
          alert("An error occured");
        });
  }, [id]);

  return (
    <>
      <Header />
      {/* <Tripheader /> */}
      <div className="mainn " style={{ backgroundColor: "#2f2b51" }}>
        <div className="containerr">
          <div className="bx1 box">
            <Side />
          </div>
          <div className="bx2 box">
            <button
              style={{ marginLeft: "480px" }}
              className="mt-2 btn btn-active"
            >
              Trips Count 
            </button>
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
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {drivers?.map((iterate, i) => (
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
                          <div className="font-bold">{iterate?.name}</div>
                          <div className="text-sm opacity-50">
                            {iterate?.license_no}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{iterate?.driver_id}</td>
                    <td>
                      {iterate?.cnt}
                      <br />
                      {/* <span className="badge badge-ghost badge-sm">
                      </span> */}
                    </td>
                    <td>
                      <Link
                        to={`/trips_home/payment/${iterate.driver_id}`}
                      >
                        <button className="btn btn-active btn-accent">payment</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
          <div className="bx3 box">
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
export default Show_count_trip;
