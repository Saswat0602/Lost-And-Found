import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from 'react-modal';

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Response from "./Components/Response";
import "bootstrap/dist/css/bootstrap.min.css";
// import PrivateRoute from "./Components/privateroute";
import Home from "./Components/Home";
// import ItemPage from "./Components/ItemPage";
import MyListings from "./Components/MyListings";
import Feed from "./Components/Feed";
import { StateProvider } from "./Context/ProjectCotext";
import LostItem from "./Components/Lost_item"

// window.OneSignal = window.OneSignal || [];
// const OneSignal = window.OneSignal;
function App() {
  // useEffect(() => {
  //   OneSignal.push(() => {
  //     OneSignal.init({
  //       appId: "fe13c665-7830-497e-9a3f-27a523840baf", //STEP 9
  //       welcomeNotification: {
  //         title: "One Signal",
  //         message: "Thanks for subscribing!",
  //       },
  //     });
  //   });
  // }, []);
  return (
    <>
      <StateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/mylistings" element={<MyListings />} />
            <Route path="/responses" element={<Response />} />
            {/* <Route path="/:item" element={<ItemPage />} /> */}
            <Route path="/feed" element={<Feed />} />
            <Route path="/LostItem" element={<LostItem />} />
          </Routes>
          <ToastContainer />
        </Router>
      </StateProvider>
    </>
  );
}

export default App;
