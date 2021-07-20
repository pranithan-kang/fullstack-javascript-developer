import React from 'react'
import Header from './Header';

const BasicThings = () => {
  let companyName = "GBDi";
  let num = 10;
  let companyAddress = <h1>Bangkok</h1>;
  
  const showMsg = () => `${companyName}.com`;
  const isLogin = false
  const showMe = (event) => {
    // companyName = "CCT"; // UI is not updated by this change
    alert("Hello React 2");
  };

  return (
    <>
      <p>
        {companyName} {num + 20}
      </p>
      {companyAddress}
      {showMsg()}
      <br />
      {
        // Conditional Rendering
        isLogin === true && <h1>Welcome to my app</h1>
      }
      {
        isLogin && (
          // fragment
          <>
            <h1>Welcome to my app 2</h1>
            <p>Welcome to my app 3</p>
          </>
        )
      }
      {
        isLogin ? <Header></Header> : <p>คุณยังไม่ได้ login</p>
      }
      <br />
      <button onClick={() => {
        alert("Hello React");
      }}>Click Me!</button>
      <button onClick={showMe}>Click Me 2!</button>
    </>
  )
}

export default BasicThings;