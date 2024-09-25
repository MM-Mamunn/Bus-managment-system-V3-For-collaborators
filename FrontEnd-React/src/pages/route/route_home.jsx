import Header from "../../components/nav";
import Footer from "../../components/footer";
import Side from "../sides/side";
import Route_side from "../sides/route_side";
function Route_home() {
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
                  Manage your Routes
                </u>
              </h1>
              <p className="text-xl mb-12 text-center">
                Complete Solution for Maintaining Your Routes
              </p>

            </div>
          </div>
          <div className="bx3 box">
        <Route_side />
          </div>
        </div>
      </div>
      <footer style={{ position: "sticky", top: "100vh", width: "100vw" }}>
        <Footer />
      </footer>
    </>
  );
}

export default Route_home;
