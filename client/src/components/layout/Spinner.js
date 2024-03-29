import React, { Fragment } from "react";
import spinner from "../../img/spinner.svg";

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "100px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};

export default Spinner;
