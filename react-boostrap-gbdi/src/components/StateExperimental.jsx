import React, { useEffect, useState } from 'react'

const StateExperimental = () => {
  const [title, setTitle] = useState("Company");

  const mouseOver = (evt) => setTitle("GBDi");

  useEffect(() => {
    console.log("Run Every Rendering Time");
    return () => {
      // Clean up https://reactjs.org/docs/hooks-effect.html
      // Equal to ComponentWillUnmount
    }
  });

  useEffect(() => {
    console.log("Run Once");
    setTitle("Initial");
  }, []); // Run Once (First-time rendering)
  
  useEffect(() => {
    console.log(`Run When title changed ${title}`);
  }, [title]); // Run When deps changed

  return (
    <>
      <h1 onMouseOver={mouseOver}>Hello {title}</h1>
    </>
  )
}

export default StateExperimental
