import { useNavigate } from "react-router-dom";
import Header from "../../components/nav";
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
import Bus_side from "../sides/bus_side";

function Efficiency_oil() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
        navigate(`/bus_home/efficiency/${data.oil}`);
   
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
                <CardTitle>Oil price per litre</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
              </CardHeader>
              <CardContent>
                <form
                  style={{ backgroundColor: "#8fa5db" }}
                  onSubmit={handleSubmit}
                >
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Enter  Oil price</Label>
                      <Input
                        type="number"
                        placeholder="Oil"
                        id="oil"
                        name="oil"
                        required
                      />
                    
                    </div>
                  </div>
                  {/* </div> */}
                  <Button className="mt-2">Enter</Button>
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
export default Efficiency_oil;
