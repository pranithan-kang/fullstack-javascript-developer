import React from "react";

import { Alert } from "react-bootstrap";

const HttpError = (props) => {
  const { message } = props;
  return (
    <div className="text-center mt-5">
      <h1>HTTP Request Error</h1>
      <Alert>
        <p>{message}</p>
      </Alert>
    </div>
  );
};

export default HttpError;
