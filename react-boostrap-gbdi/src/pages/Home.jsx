import React from "react";
import { GiBalloonDog } from "react-icons/gi";
import meowPic from "../assets/img/557974.jpg";

const Home = () => {
  return (
    <main className="container">
      <div className="bg-light p-5 rounded">
        <h1>
          <GiBalloonDog color="rgb(27, 98, 156)" size="2em" /> Home
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </main>
  );
};

export default Home;
