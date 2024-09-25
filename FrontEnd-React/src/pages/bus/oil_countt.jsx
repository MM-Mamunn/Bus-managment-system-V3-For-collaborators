import { useNavigate } from "react-router-dom";
import Header from "../../components/nav";
import Footer from "../../components/footer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Side from "../sides/side";
import Trip_side from "../sides/trip_side";
import { useEffect, useState } from "react";
import axios from "axios";
import Bus_side from "../sides/bus_side";

function Oil_countt() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    navigate(`/bus_home/oil_countt/${data.date1}/${data.date2}`);
  };


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
                      <Label htmlFor="name">Enter Date Range</Label>
                      <Input
                        type="date"
                        placeholder="From"
                        id="date1"
                        name="date1"
                        required
                      />
                      <Input
                        type="date"
                        placeholder="To"
                        id="date2"
                        name="date2"
                        required
                      />
                      {/* <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1">
                          Click
                        </div> */}
                      {/* <label for="cars">Choose a driver</label>
                        <select id = "driver_id" name = "driver_id" required 
                          tabIndex={0}
                          className="dropdown-content menu bg-black text-white rounded-box z-[1] w-52 p-2 shadow"
                        >
                          {drivers?.map((iterate) => (
                          <option>
                            {iterate?.driver_id}
                          </option>
                          ))}
                        </select> */}
                    </div>
                  </div>
                  {/* </div> */}
                  <Button className="mt-2">Count Oil</Button>
                </form>
              </CardContent>
              {/* </form> */}
            </Card>
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
export default Oil_countt;
