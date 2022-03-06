import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res;
    console.log(data.status);

    if (data.status === 422 || !data) {
      window.alert("invalid Registration");
      console.log("invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate("/Login");
    }
  };

  return (
    <>
      <section className="signUp">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h1 className="form-title text-center mb-4">Sign Up</h1>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={user.name}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Enter Your Name"
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Enter Your E-mail"
                  />
                  <label htmlFor="email">E-mail</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="Number"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Enter Your Phone Number"
                  />
                  <label htmlFor="phone">Phone</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="work"
                    id="work"
                    value={user.work}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Enter Your Work Profession"
                  />
                  <label htmlFor="work">Work</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Enter Your Password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="cpassword"
                    id="cpassword"
                    value={user.cpassword}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Confirm your Password"
                  />
                  <label htmlFor="cpassword">Confirm Password</label>
                </div>
                <div className="d-grid gap-2">
                  <button
                    onClick={PostData}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div className="navl text-center">
                  <NavLink
                    to="/Login"
                    className="signup-image-link text-center"
                  >
                    I already have an account..
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
