import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Driver_insert from "./pages/driver/driver_insert";
import Trip_insert from "./pages/trips/trip_insert";
import Driver_view from "./pages/driver/driver_view";
import Bus_view from "./pages/bus/bus_view";
import Driver_home from "./pages/driver/drivers_home";
import Trip_home from "./pages/trips/trips_home";
import Search_trip from "./pages/trips/search_trip";
import Trip_all from "./pages/trips/trip_all";
import Count_trip from "./pages/trips/count_trip";
import About_us from "./pages/about_us";
import Bus_delete from "./pages/bus/bus_delete";
import Driver_update from "./pages/driver/driver_update";
import Show_Search_Trip from "./pages/trips/show_search_trip";
import Show_count_payment from "./pages/trips/show_count_payment";
import Show_count_trip from "./pages/trips/show_count_trip";
import Count_payment from "./pages/trips/count_payment";
import Oil_count from "./pages/bus/oil_count";
import Oil_countt from "./pages/bus/oil_countt";
import Bus_home from "./pages/bus/bus_home";
import Search_driver from "./pages/driver/search_driver";
import Show_search_driver from "./pages/driver/show_search_driver";
import Total_distance from "./pages/driver/total_distance";
import Total_distancee from "./pages/driver/total_distancee";
import Bus_update from "./pages/bus/bus_update";
import Maintanance_home from "./pages/maintanance/maintanance_home";
import Maintanance_view from "./pages/maintanance/maintanance_view";
import Search_maintanance from "./pages/maintanance/search_maintanance";
import Show_search_maintanance from "./pages/maintanance/show_search_maintanance";
import Efficiency from "./pages/bus/efficiency";
import Efficiency_oil from "./pages/bus/efficiency_oil";
import Route_view from "./pages/route/route_view";
import Route_home from "./pages/route/route_home";
import AuthPage from "./pages/auth/authPage";
import SharedComponent from "./components/SharedComponent";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {/* Apply SharedComponent to all routes */}
            <Route path="/" element={<SharedComponent />}>
              <Route index element={<Home />} />

              <Route path="bus_home">
                <Route path="" element={<Bus_home />} />
                <Route path="oil_countt">
                  <Route path="" element={<Oil_countt />} />
                  <Route path=":id1?/:id2?" element={<Oil_count />} />
                </Route>
                <Route path="bus_view" element={<Bus_view />} />
                <Route path="bus_delete" element={<Bus_delete />} />
                <Route path="bus_update" element={<Bus_update />} />
                <Route path="efficiency">
                  <Route path="" element={<Efficiency_oil />} />
                  <Route path=":id?" element={<Efficiency />} />
                </Route>
              </Route>

              <Route path="drivers_home">
                <Route path="" element={<Driver_home />} />
                <Route path="driver_view" element={<Driver_view />} />
                <Route path="driver_insert" element={<Driver_insert />} />
                <Route path="driver_update" element={<Driver_update />} />
                <Route path="search_driver">
                  <Route path="" element={<Search_driver />} />
                  <Route path=":id" element={<Show_search_driver />} />
                </Route>
                <Route path="total_distance">
                  <Route path="" element={<Total_distance />} />
                  <Route path=":id1?/:id2?" element={<Total_distancee />} />
                </Route>
              </Route>

              <Route path="trips_home">
                <Route path="search_trip">
                  <Route path="" element={<Search_trip />} />
                  <Route path=":id" element={<Show_Search_Trip />} />
                </Route>
                <Route path="count_trip">
                  <Route path="" element={<Count_trip />} />
                  <Route path=":id" element={<Show_count_trip />} />
                </Route>
                <Route path="payment">
                  <Route path="" element={<Count_payment />} />
                  <Route path=":id" element={<Show_count_payment />} />
                </Route>
                <Route path="" element={<Trip_home />} />
                <Route path="trip_insert" element={<Trip_insert />} />
                <Route path="trip_all" element={<Trip_all />} />
              </Route>

              <Route path="maintanance">
                <Route path="" element={<Maintanance_home />} />
                <Route path="maintanance_view" element={<Maintanance_view />} />
                <Route path="search_maintanance">
                  <Route path="" element={<Search_maintanance />} />
                  <Route path=":id" element={<Show_search_maintanance />} />
                </Route>
              </Route>

              <Route path="route">
                <Route path="" element={<Route_home />} />
                <Route path="route_view" element={<Route_view />} />
              </Route>

              <Route path="about_us" element={<About_us />} />
              <Route path="auth" element={<AuthPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
