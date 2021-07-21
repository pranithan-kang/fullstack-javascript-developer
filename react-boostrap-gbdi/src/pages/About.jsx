import React, {useState, useEffect, useRef} from "react";
import { GiBalloonDog } from "react-icons/gi";
import meowPic from "../assets/img/557974.jpg";
import axios from "axios";

const About = () => {
  const [version, setVersion] = useState("");
  const cancelToken = useRef();

  const getData = async () => {
    const resp = await axios.get("https://api.codingthailand.com/api/version", {
      cancelToken: cancelToken.current.token,
    });
    // console.log(resp.data.data.version);
    setVersion(resp.data.data.version);
  }

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();
    return () => {
      cancelToken.current.cancel();
      console.log("Exit About page");
    };
  }, [])

  return (
    <main className="container">
      <div className="bg-light p-5 rounded">
        <h1>About Page</h1>
        <div className="lead">
          {
            version && (
              <p>API Version: {version}</p>
            )
          }
          <img src={meowPic} alt="meow-pic" style={{ maxWidth: "300px" }} />
          <div>
            This is a cat that I found when I was coming home.
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
