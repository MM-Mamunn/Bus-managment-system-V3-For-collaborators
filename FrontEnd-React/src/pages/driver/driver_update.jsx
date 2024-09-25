import { useNavigate } from "react-router-dom";
import Header from "../../components/nav";
import axios from "axios";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import Driver_side from "../sides/driver_side";
import Side from "../sides/side";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Driver_update() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    for(let i = 0 ; i < drivers.length;i++) {
      if(drivers[i].driver_id == data.id) {
        axios
          .patch("http://127.0.0.1:8000/api/driver_update", data)
          .then((res) => {
           alert("Driver Updated successfully")
            // console.log(res);
          })
          .catch((error) => {
            //   navigate("/failed");
            alert("An error occured")
          });
        return;
      }
    }
    alert(`Driver with "${data.id}" does not exist.Select Correct Driver id`);
  };
  const [drivers, setdrivers] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/driver_view?limit=1000")
      .then((res) => {
        setdrivers(res?.data?.data?.users);

      })
      .catch((error) => {
        alert("An error occured")
      });
  }, []);
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
            {/* Shadcn  */}
            <Card
              style={{ marginLeft: "20vw", backgroundColor: "#48597f" }}
              className=" mt-2 w-[350px]"
            >
              {/* <form onSubmit={handleSubmit}> */}
              <CardHeader>
                <CardTitle>Update Driver</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
              </CardHeader>
              <CardContent>
                <form
                  style={{ backgroundColor: "#8fa5db" }}
                  onSubmit={handleSubmit}
                >
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <input
                        style={{
                          backgroundColor: "#27274b",
                          width: "235px",
                          color: "white",
                        }}
                        type="text"
                        placeholder="Current Driver Id"
                        id="id"
                        name="id"
                        required
                      />
                      <input
                        style={{
                          backgroundColor: "#27274b",
                          width: "235px",
                          color: "white",
                        }}
                        type="text"
                        placeholder="New Driver Id"
                        id="driver_id"
                        name="driver_id"
                        required
                      />
                      <input
                        style={{
                          backgroundColor: "#27274b",
                          width: "235px",
                          color: "white",
                        }}
                        type="text"
                        placeholder="Name"
                        id="name"
                        name="name"
                        required
                      />
                      <input
                        style={{
                          backgroundColor: "#27274b",
                          width: "235px",
                          color: "white",
                        }}
                        type="number"
                        placeholder="Age"
                        name="age"
                        required
                      />
                      <input
                        style={{
                          backgroundColor: "#27274b",
                          width: "235px",
                          color: "white",
                        }}
                        type="text"
                        placeholder="License no"
                        name="license_no"
                        className="mb-4 h-10"
                        required
                      />
                      
                    </div>
                  </div>
                  {/* </div> */}
                  <Button className="mt-2">insert</Button>
                </form>
              </CardContent>
              {/* </form> */}
            </Card>
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
export default Driver_update;
