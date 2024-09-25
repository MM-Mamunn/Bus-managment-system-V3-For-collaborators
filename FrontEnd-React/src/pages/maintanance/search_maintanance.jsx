import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/nav";
import axios from "axios";
import "../CSS/main.css";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Side from "../sides/side";
import Trip_side from "../sides/trip_side";
import Maintanance_side from "../sides/maintanance_side";

function Search_maintanance() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    for(let i = 0 ; i < buses.length;i++) {
      if(buses[i].bus_id == data.bus_id) {
        navigate(`/maintanance/search_maintanance/${data.bus_id}`);
        return;
      }
    }
    alert(`Bus with "${data.bus_id}" does not exist.Select Correct Bus id`);
  };
  const [buses, setdrivers] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/bus_view?limit=1000")
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
            <Card style={{marginLeft:"20vw", backgroundColor:"#48597f"}}className=" mt-2 w-[350px]">
              {/* <form onSubmit={handleSubmit}> */}
              <CardHeader>
                <CardTitle>Search Maintanance</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
              </CardHeader>
              <CardContent>
                <form style ={{backgroundColor:"#8fa5db"}}onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Search by Bus ID</Label>
                      <Input
                        type="text"
                        placeholder="Bus id"
                        id="bus_id"
                        name="bus_id"
                        required
                      />
                    </div>
                  </div>
                  <Button className="mt-2">Search</Button>
                </form>
              </CardContent>
              {/* </form> */}
            </Card>
          </div>
          <div className="bx3 box">
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
export default Search_maintanance;
