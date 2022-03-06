import React from "react";
import { useEffect } from "react";
import Logo from "../images/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const About = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUserData(data);

      if (!(res.status == 200)) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/Login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  const { name, email, phone, work } = userData;

  return (
    <>
      <div className="container employee-profike">
        <form method="GET">
          <div className="row">
            <div className="col-md-4 ">
              <img className="profile-img" src={Logo} alt="no inage" />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{name}</h5>
                <h5>{work}r</h5>
                <p className="profile-rating mt-3 mb-5">
                  RANKING : <span className="ranking">1/10</span>
                </p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-outline-primary">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p className="ml-5 mt-2">WORK LINKD</p>
                <a
                  className="links"
                  href="https://www.youtube.com/"
                  target="_blank"
                >
                  You Tube :- Click Here
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.twitter.com/"
                  target="_blank"
                >
                  Twitter :- Click Here
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.instagram.com/"
                  target="_blank"
                >
                  Instagram :- Click Here
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.facebook.com/"
                  target="_blank"
                >
                  Facebook :- Click Here
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.google.com/"
                  target="_blank"
                >
                  Google :- Click Here
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.gmail.com/"
                  target="_blank"
                >
                  Gmail:- Click Here
                </a>
                <br />
              </div>
            </div>
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content " id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Name :-</label>
                    </div>
                    <div className="col-md-6">
                      <p>{name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Work</label>
                    </div>
                    <div className="col-md-6">
                      <p>{work}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>User email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Contact</label>
                    </div>
                    <div className="col-md-6">
                      <p>{phone}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade show "
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>myname is gaurang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
