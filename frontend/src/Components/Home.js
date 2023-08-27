import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import "../css/landing.css";
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
// import image from "../img/undraw_lost_bqr2.svg";
// import {annotate} from "rough-notation"
import developer from "../img/developer_outline I.svg";
import login from "../img/login-1.svg";
import list_item from "../img/list-item.svg";
import notification from "../img/notification.svg";
import github from "../img/github.svg";
import linkedin from "../img/linkedin.svg";
import instagram from "../img/instagram.svg";
import mail from "../img/mail.svg";
import feature from "../img/feature.svg";

// import image from "../img/earth.svg";
import { Container, Row, Button, Form } from "react-bootstrap";
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const postitem = () => {
  //   if (localStorage.getItem("user") !== null) {
  //     console.log("User already logged in !");
  //   } else {
  //     console.log("Not logged in");
  //   }
  // };
  const ref = useRef();
  AOS.init();

  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });

  // const e=document.getElementById('.title-h')
  // const annotation=annotate(e,{ type: 'underline' })
  // annotation.show()
  const sendMessage = () => {
    const data = {
      name,
      email,
      message,
    };
    Axios({
      method: "POST",
      url: "https://lfs-backend.herokuapp.com/sendmessage",
      data: data,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <>
      <Navbar />
      <div data-aos="fade-right" className="main">
        <div className="intro">
          <div className="part-1">
            <div className="title">
              <h1 id="title-h">Lost and Found</h1>
              <p>Lost it😕. List it📃. Find it🤩.</p>
              <Button
                variant="custom"
                size="lg"
                onClick={() => {
                  ref.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="part-2">
            <div className="image">
              <img
                src=""
                style={{ width: "500px", height: "500px" }}
                alt="images"
              />
            </div>
          </div>
        </div>
      </div>

      <div data-aos="fade-left">
        <Container fluid>
          <div className="total-about">
            <div ref={ref} className="about-heading">
              <h6 className="section-heading">How it works ⚒️?</h6>
            </div>
            <div className="about-card">
              <div className="info">
                <img
                  src={login}
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                />
                <h4>Create an account</h4>
                <p>Initially, you have to create an account to get started.</p>
                <a href="/log-in">
                  <Button variant="custom" size="lg">
                    Sign Up
                  </Button>
                </a>
              </div>
              <div className="info">
                <img
                  src={list_item}
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                />
                <h4>List Lost/Found Item</h4>
                <p>
                  List your item on the wall by filling certain details and
                  image. That's it !
                </p>
              </div>
              <div className="info">
                <img
                  src={notification}
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                />
                <h4>Get Notified</h4>
                <p>
                  Once anyone posts an item, we make our registred users aware
                  about the same by sending notification .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    

      <div className="footer">
        <div className="social-icon">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} className="icon github" alt="" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} className="icon" alt="" />
          </a>
        
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mail} className="icon" alt="" />
          </a>
        </div>
        <div className="personal-info">
          <p>Created with ❤️ using MERN by </p>
          <h4>
            <span className="symbol">&#60;</span>No one
            <span className="symbol">/&#62;</span>
          </h4>
        
        </div>
        <h5 style={{ textAlign: "center" }}>
          Copyright © 2022. All rights reserved.
        </h5>
      </div>
     
    </>
  );
}
