import React from "react";
import { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userHomePage = async () => {
      try {
        const res = await fetch("/getData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setUserName(data.name);
        setShow(true);
      } catch (err) {
        console.log(err);
      }
    };
    userHomePage();
  }, []);

  return (
    <>
      <div className="Home">
        {show ? (
          <>
            <p>Hello {userName} Welcome to the Virtual World</p>
            <h1>{userName}</h1>
            <h2>"Happy to See you Back"</h2>
          </>
        ) : (
          <>
            <p>HELLO </p>
            <h2>WE ARE MERN DEVELOPER</h2>
          </>
        )}

        {/* <p>Hello Sign In to a Beautiful Website</p>
        <h1>{userName}</h1>
        <h2>{show ?  : "WE ARE MERN DEVELOPER"}</h2> */}
      </div>
    </>
  );
};

export default Home;
