import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Trip_all() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [trips, setdrivers] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/trip_all?limit=1000")
      .then((res) => {
        setdrivers(res?.data?.data?.users);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <Input
            className="w-80"
            placeholder="Search by driver name or bus id"
            icon={<FaSearch />}
          />
          <Button>
            <FaSearch />
          </Button>
        </div>
        <div className="flex justify-around items-center gap-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out ">
                Count Trips
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Count Trips</DialogTitle>
                <DialogDescription>
                  Count the total trips of specific bus
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="busId" className="text-right">
                    Bus ID
                  </Label>
                  <Input
                    id="busId"
                    placeholder="Enter specific bus id"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Show total trips</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out ">
                Check Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Total Payment</DialogTitle>
                <DialogDescription>
                  Count the total payment of specific bus
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="busId" className="text-right">
                    Bus ID
                  </Label>
                  <Input
                    id="busId"
                    placeholder="Enter specific bus id"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Show total payments</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out ">
                <IoMdAddCircle className="mr-2 text-xl" />
                Insert New Trip
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-gray-50 p-6 rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800">
                  Insert New Route
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  Fill out the details for the new route. Click save to insert
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
                    Bus ID
                  </Label>
                  <Input
                    id="busId"
                    placeholder="Enter Bus ID"
                    className="w-full"
                  />
                </div>

                {/* Date Field with Icon */}
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="date"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    Date
                  </Label>
                  <div className="relative w-full">
                    <DatePicker
                      id="date"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="MM-dd-yyyy"
                      placeholderText="   Select a date"
                      showIcon
                      // Adjusted padding-left to make space for the icon
                    />
                    {/* Centering the icon vertically */}
                  </div>
                </div>

                {/* Route Field */}
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="route"
                    className="w-1/3 text-right font-medium text-gray-700"
                  >
                    Route
                  </Label>
                  <Input
                    id="route"
                    placeholder="Enter Route Name"
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
        {/* Insert Payment Button */}
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white shadow-md rounded-lg">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead className="px-6 py-4">Name & License</TableHead>
              <TableHead className="px-6 py-4">Bus Id</TableHead>
              <TableHead className="px-6 py-4">Route Name</TableHead>
              <TableHead className="px-6 py-4">Date</TableHead>
              <TableHead className="px-6 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips?.map((iterate) => (
              <TableRow
                key={iterate?.bus_id}
                className="border-b border-gray-200"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src="https://github.com/shadcn.png" alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{iterate?.name}</div>
                      <div className="text-sm text-gray-500">
                        {iterate?.license_no}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">{iterate?.bus_id}</TableCell>
                <TableCell className="px-6 py-4">
                  {iterate?.route_name}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <button className="btn btn-ghost btn-xs">
                    {iterate?.date}
                  </button>
                </TableCell>
                <TableCell className="px-6 py-4 flex">
                  <Dialog>
                    <DialogTrigger asChild>
                      <FaEdit
                        className="text-green-800 cursor-pointer"
                        size={30}
                      />
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px] bg-gray-50 p-6 rounded-lg shadow-lg">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-800">
                          Update the route
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-500">
                          Fill out the details you want to update. Click save to
                          insert it.
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
                            Bus ID
                          </Label>
                          <Input
                            id="busId"
                            placeholder="Enter Bus ID"
                            className="w-full"
                          />
                        </div>

                        {/* Date Field with Icon */}
                        <div className="flex items-center gap-4">
                          <Label
                            htmlFor="date"
                            className="w-1/3 text-right font-medium text-gray-700"
                          >
                            Date
                          </Label>
                          <div className="relative w-full">
                            <DatePicker
                              id="date"
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                              dateFormat="MM-dd-yyyy"
                              placeholderText="   Select a date"
                              showIcon
                            />
                          </div>
                        </div>

                        {/* Route Field */}
                        <div className="flex items-center gap-4">
                          <Label
                            htmlFor="route"
                            className="w-1/3 text-right font-medium text-gray-700"
                          >
                            Route
                          </Label>
                          <Input
                            id="route"
                            placeholder="Enter Route Name"
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
                  <Dialog>
                    <DialogTrigger>
                      <MdDeleteForever
                        className="text-red-800 cursor-pointer"
                        size={30}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. Are you sure you want to
                          permanently delete this file from our servers?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button type="submit">Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Trip_all;
