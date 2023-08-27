import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
// import Feed from "./Components/Feed";
import Response from "./Components/Response";
import "bootstrap/dist/css/bootstrap.min.css";
// import PrivateRoute from "./Components/privateroute";
import Home from "./Components/Home";
import ItemPage from "./Components/ItemPage";
import MyListings from "./Components/MyListings";
window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;
function App() {
  useEffect(() => {
    OneSignal.push(() => {
      OneSignal.init({
        appId: "fe13c665-7830-497e-9a3f-27a523840baf", //STEP 9
        welcomeNotification: {
          title: "One Signal",
          message: "Thanks for subscribing!",
        },
      });
    });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/responses" element={<Response />} />
          <Route path="/:item" element={<ItemPage />} />
          {/* <PrivateRoute path="/feed" element={<Feed />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
