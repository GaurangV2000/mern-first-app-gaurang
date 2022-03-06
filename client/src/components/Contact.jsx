import React from "react";
import { useEffect, useState } from "react";
import LocalPostOfficeRoundedIcon from "@material-ui/icons/LocalPostOfficeRounded";
import PhoneAndroidTwoToneIcon from "@material-ui/icons/PhoneAndroidTwoTone";
import MapTwoToneIcon from "@material-ui/icons/MapTwoTone";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!(res.status == 200)) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // send the data to backened

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();

    if (!data || !message) {
      alert("PLz fill All the INformation & Message");
    } else {
      alert("Message Send");
      setUserData({ ...userData, message: "" });
    }
  };

  const { name, email, phone, message } = userData;

  return (
    <>
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact us
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>

        <div className="contact-form row">
          <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" method="POST" name="contact-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <label htmlFor="name" className="">
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      name="name"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <label htmlFor="email" className="">
                      Your email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      name="email"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form">
                    <label htmlFor="message">Your message</label>
                    <textarea
                      type="text"
                      name="message"
                      id="message"
                      rows="2"
                      value={message}
                      onChange={handleInput}
                      className="form-control md-textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>

            <div className="text-center text-md-left">
              <div className="d-grid gap-2">
                <button
                  onClick={contactForm}
                  className="btn btn-primary"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="status"></div>
          </div>

          <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
              <li>
                <MapTwoToneIcon />
                <p>Mumbai , Maharsahtra</p>
              </li>

              <li>
                <PhoneAndroidTwoToneIcon />
                <p>+91 6152634985</p>
              </li>

              <li>
                <LocalPostOfficeRoundedIcon />
                <p>vasoyagaurang1357@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
