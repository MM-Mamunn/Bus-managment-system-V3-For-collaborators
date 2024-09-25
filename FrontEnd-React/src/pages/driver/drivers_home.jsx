
import Header from "../../components/nav";
import Footer from "../../components/footer";
import Driver_side from "../sides/driver_side";
import Side from "../sides/side";
function Driver_home() {
  const handleSubmit = (e) => {
    e.preventDefault();
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
            <div className="min-h-screen flex flex-col items-center justify-center ">
              <h1 className="text-3xl font-bold text-center mb-8 text-white animate-bounce">
                <u className="no-underline inline-block animation fadeInOut">
                  Manage your Drivers
                </u>
              </h1>
              <p className="text-xl mb-12 text-center">
                Complete Solution for Maintaining Your Drivers
              </p>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
                <a
                  href="/trips_home"
                  className="bg-stone-300 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    Track the Buses
                  </h2>
                  <p>
                    Track your buses by the Trip dashboard.That shows everything
                    about trips.
                  </p>
                </a>

                <a
                  href="/coming_soon"
                  className="bg-stone-300 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    Maintenance Scheduling
                  </h2>
                  <p>Schedule and manage maintenance activities efficiently.</p>
                </a>

                <a
                  href="/drivers_home"
                  className="bg-stone-300 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    Driver Management
                  </h2>
                  <p>
                    Keep track of driver assignments and performance metrics.
                  </p>
                </a>

                <a
                  href="/bus_home"
                  className="bg-stone-300 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    Bus Monitoring
                  </h2>
                  <p>Monitor Bus, add new Bused and update or delete bus.</p>
                </a>

                <a
                  href="/coming_soon"
                  className="bg-stone-300 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-4">Route </h2>
                  <p>Watch and maintain Route</p>
                </a>

                <a
                  href="/coming_soon"
                  className="bg-stone-300 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    Comprehensive Reports
                  </h2>
                  <p>
                    Generate detailed reports for insights and decision making.
                  </p>
                </a>
              </div> */}
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
  );
}

export default Driver_home;
