import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IoMdAddCircle } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaSearch, FaIdCard, FaBusAlt, FaUser } from "react-icons/fa";
const dImage = "https://github.com/shadcn.png";
import { BsThreeDots } from "react-icons/bs";

function DriverView() {
  const [drivers, setDrivers] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/driver_view?limit=1000")
      .then((res) => {
        setDrivers(res?.data?.data?.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-6">
      {/* Search Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0 space-x-2">
        <div className="flex items-center w-full space-x-3">
          <Input
            className="w-full lg:w-64"
            placeholder="Search by driver name or bus ID"
          />
          <Button className="p-2">
            <FaSearch className="text-lg" />
          </Button>
        </div>

        <div className="flex flex-col w-full lg:w-auto space-y-4 lg:space-y-0 lg:flex-row justify-around items-center gap-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center w-full space-x-2 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out ">
                Total Distance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-50 p-6 rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800">
                  Check Total Distance
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="flex justify-center w-full h-full items-center gap-4">
                  <Label
                    htmlFor="driverId"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    Driver ID
                  </Label>
                  <Input
                    id="driverId"
                    placeholder="Enter Driver ID"
                    className="w-full"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="startDate"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    Start Date
                  </Label>
                  <div className="relative w-full">
                    <DatePicker
                      id="startDate"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MM-dd-yyyy"
                      placeholderText="   Select a start date"
                      showIcon
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="endDate"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    End Date
                  </Label>
                  <div className="relative w-full">
                    <DatePicker
                      id="endDate"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="MM-dd-yyyy"
                      placeholderText="   Select a end date"
                      showIcon
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center w-full space-x-2 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out ">
                <IoMdAddCircle className="mr-2 text-xl" />
                Insert New Driver
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-50 p-6 rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800">
                  Insert New Driver
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  Fill out the details for the new driver. Click save to insert
                  it.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-6">
                {/* Driver ID Field */}
                <div className="flex justify-center w-full h-full items-center gap-4">
                  <Label
                    htmlFor="driverId"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    Driver ID
                  </Label>
                  <Input
                    id="driverId"
                    placeholder="Enter Driver ID"
                    className="w-full"
                  />
                </div>

                {/* Bus ID Field */}
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="busId"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter Driver Name"
                    className="w-full"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="age"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    Age
                  </Label>
                  <Input
                    type="number"
                    id="age"
                    placeholder="Enter Driver Age"
                    className="w-full"
                  />
                </div>

                {/* Route Field */}
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="route"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    License No
                  </Label>
                  <Input
                    id="route"
                    placeholder="Enter Lisence No"
                    className="w-full"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                >
                  Insert
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Drivers List */}
      <div className="grid justify-around  gap-6 lg:grid-cols-3 sm:grid-cols-2">
        {drivers?.map((driver) => (
          <div
            key={driver?.driver_id}
            className="max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            {/* Dropdown Button */}
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="text-white hover:bg-gray-800 p-1.5">
                    <BsThreeDots />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-black border border-gray-700 text-white"
                >
                  <DropdownMenuItem asChild>
                    <Button
                      asChild
                      className="w-full cursor-pointer hover:!bg-gray-800 hover:!text-white  bg-black"
                    >
                      <Link to={`/trips_home/count_trip/${driver?.driver_id}`}>
                        Count Trip
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      asChild
                      className="w-full cursor-pointer hover:!bg-gray-800 hover:!text-white  bg-black"
                    >
                      <Link to={`/trips_home/payment/${driver?.driver_id}`}>
                        Count Payment
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full  bg-black">
                          Edit Driver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] bg-gray-50 p-6 rounded-lg shadow-lg">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold text-gray-800">
                            Update Driver Information
                          </DialogTitle>
                          <DialogDescription className="text-sm text-gray-500">
                            Fill out the details that you want to update, keep
                            empty if information has nothing to update
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-6 py-6">
                          {/* Driver ID Field */}
                          <div className="flex justify-center w-full h-full items-center gap-4">
                            <Label
                              htmlFor="currentDriverId"
                              className="w-1/3 text-right font-medium text-gray-700"
                            >
                              Current Driver ID
                            </Label>
                            <Input
                              id="currentDriverId"
                              placeholder="Enter Current Driver ID"
                              className="w-full"
                            />
                          </div>

                          {/* Bus ID Field */}
                          <div className="flex items-center gap-4">
                            <Label
                              htmlFor="NewBusId"
                              className="w-1/3 text-right font-medium text-gray-700"
                            >
                              New Bus ID
                            </Label>
                            <Input
                              id="NewBusId"
                              placeholder="Enter New Driver Name"
                              className="w-full"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <Label
                              htmlFor="name"
                              className="w-1/3 text-right font-medium text-gray-700"
                            >
                              Name
                            </Label>
                            <Input
                              id="name"
                              placeholder="Enter New Name"
                              className="w-full"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <Label
                              htmlFor="age"
                              className="w-1/3 text-right font-medium text-gray-700"
                            >
                              Age
                            </Label>
                            <Input
                              type="number"
                              id="age"
                              placeholder="Enter Driver Age"
                              className="w-full"
                            />
                          </div>

                          {/* Route Field */}
                          <div className="flex items-center gap-4">
                            <Label
                              htmlFor="licenseNo"
                              className="w-1/3 text-right font-medium text-gray-700"
                            >
                              License No
                            </Label>
                            <Input
                              id="licenseNo"
                              placeholder="Enter Lisence No"
                              className="w-full"
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            type="submit"
                            className="text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                          >
                            Update
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full text-red-700 bg-black">
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. Are you sure you want
                            to permanently delete this file from our servers?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button type="submit">Confirm</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Driver Info */}
            <div className="flex flex-col items-center text-white">
              <div className="relative w-24 h-24 mb-3">
                <img
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  src={dImage}
                  alt="Driver"
                />
                <span className="absolute bottom-0 right-0 text-white bg-gray-900 p-1 rounded-full">
                  <FaUser size={18} />
                </span>
              </div>
              <h5 className="text-xl font-semibold">{driver?.name}</h5>
              <div className="mt-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <FaIdCard className="text-gray-400" />
                  <span>License: {driver?.license_no}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBusAlt className="text-gray-400" />
                  <span>Driver ID: {driver?.driver_id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-400" />
                  <span>Age: {driver?.age}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverView;

/*
<>
  <Header />
      <div className="mainn " style={{ backgroundColor: "#2f2b51" }}>
        <div className="containerr">
          <div className="bx1 box">
            <Side />
          </div>
          <div className="bx2 box">
            <div className="having">
              {drivers?.map((iterate) => (
                <div
                  style={{
                    maxWidth: "20vw",
                    marginLeft: "3px",
                    backgroundColor: "rgb(19, 19, 49)",
                    boxShadow: "3px 2px  8px white",
                  }}
                  class="mt-6 w-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div class="flex justify-end px-4 pt-4">
                    <button
                      id="dropdownButton"
                      data-dropdown-toggle="dropdown"
                      class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                      type="button"
                    >
                      <span class="sr-only">Open dropdown</span>
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                    </button>
                    <div
                      id="dropdown"
                      class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul class="py-2" aria-labelledby="dropdownButton">
                        <li>
                          <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Edit
                          </div>
                        </li>
                        <li>
                          <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Export Data
                          </div>
                        </li>
                        <li>
                          <div class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Delete
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="flex flex-col items-center pb-10">
                    <img
                      class="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={dImage}
                      alt="Bus"
                    />
                    <h5
                      style={{ fontWeight: "900" }}
                      class="mb-1 text-xl font-medium text-white dark:text-white"
                    >
                      {iterate?.name}
                    </h5>
                    <span
                      style={{ color: "grey" }}
                      class="text-sm  dark:text-gray-400"
                    >
                      License: {iterate?.license_no}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Driver_id: {iterate?.driver_id}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Age: {iterate?.age}
                    </span>
                    <div class="flex mt-4 md:mt-6">
                      <Link to={`/trips_home/count_trip/${iterate?.driver_id}`}>
                        <div
                          style={{ marginRight: "2px", width: "130px" }}
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Count Trip
                        </div>
                      </Link>
                      <Link to={`/trips_home/payment/${iterate?.driver_id}`}>
                        <div
                          style={{ marginRight: "2px", width: "130px" }}
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Count Payment
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
    */
