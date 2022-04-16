import React from "react";
import { Spinner } from "react-bootstrap";

const Loadscreen = () => {
  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center bg-dark text-light">
      <Spinner animation="border" color="primary" />
      <br />
      <div>&nbsp;Loading...</div>
    </div>
  );
};

export default Loadscreen;
