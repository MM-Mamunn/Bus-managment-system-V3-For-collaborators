import { useNavigate } from "react-router-dom";
import Header from "../../components/nav";
import axios from "axios";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import Side from "../sides/side";
import Trip_side from "../sides/trip_side";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Trip_insert() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let f1 = 0,
      f2 = 0,
      f3 = 0;
    for (let i = 0; i < drivers.length; i++) {
      if (drivers[i].driver_id == data.driver_id) {
        f1 = 1;
        break;
      }
    }

    for (let i = 0; i < buses.length; i++) {
      if (buses[i].bus_id == data.bus_id) {
        f2 = 1;
        break;
      }
    }
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].route_name == data.route_name) {
        f3 = 1;
        break;
      }
    }
    if ((f1 == 1) & (f2 == 1) & (f3 == 1)) {
      axios
        .post("http://127.0.0.1:8000/api/trip_insert", data)
        .then((res) => {
          alert("Successfully added trip")
          // navigate("/success");
          // console.log(res);
        })
        .catch((error) => {
          navigate(`/failed/${1}`);
        });
      return;
    }
    if(f1 == 0)
      alert(`"${data.driver_id}" is not  valid, please chose correct driver ID`)
    else if(f2 == 0)
      alert(`"${data.bus_id}" is not  valid, please chose correct Bus ID`)
    else if(f3 == 0)
      alert(`"${data.route_name}" is not  valid, please chose correct Route name`)
    else alert("unexpected error occured");
  };
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  const delay = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const busResponse = await axios.get(
          "http://127.0.0.1:8000/api/bus_view?limit=1000"
        );
        setBuses(busResponse?.data?.data?.users || []);
        console.log(busResponse);

        await delay(200); // Delay of 0.2 seconds

        const routeResponse = await axios.get(
          "http://127.0.0.1:8000/api/route_view?limit=1000"
        );
        setRoutes(routeResponse?.data?.data?.users || []);
        console.log(routeResponse);

        await delay(200); // Delay of 0.2 seconds

        const driverResponse = await axios.get(
          "http://127.0.0.1:8000/api/driver_view?limit=1000"
        );
        setDrivers(driverResponse?.data?.data?.users || []);
        console.log(driverResponse);
      } catch (error) {
        alert("An error occurred while fetching data");
        console.error(error);
      }
    };

    fetchData();
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
                <CardTitle>Enter Driver Id</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
              </CardHeader>
              <CardContent>
                <form
                  style={{ backgroundColor: "#8fa5db" }}
                  onSubmit={handleSubmit}
                >
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <input style={{backgroundColor:"#27274b", width:"235px",color:"white"}}
            type="text"
            placeholder="Driver Id"
            id="driver_id"
            name="driver_id"
            required
          />
          <input style={{backgroundColor:"#27274b", width:"235px",color:"white"}} type="text" placeholder="Bus Id" name="bus_id" required />
          <input style={{backgroundColor:"#27274b", width:"235px",color:"white"}} 
            type="date"
            placeholder="Date"
            name="date"
            className="mb-4 h-10"
            required
          />
          <input style={{backgroundColor:"#27274b", width:"235px",color:"white"}} type="text" placeholder="Route" name="route_name" required />
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
export default Trip_insert;
