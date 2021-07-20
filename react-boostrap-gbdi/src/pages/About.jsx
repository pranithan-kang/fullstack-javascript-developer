import React from "react";
import { GiBalloonDog } from "react-icons/gi";
import meowPic from "../assets/img/557974.jpg";

const About = () => {
  return (
    <main className="container">
      <div className="bg-light p-5 rounded">
        <h1>About Page</h1>
        <p className="lead">
          <img src={meowPic} alt="meow-pic" style={{ maxWidth: "300px" }} />
          <div>
            This is a cat that I found when I was coming home.
          </div>
        </p>
      </div>
    </main>
  );
};

export default About;
