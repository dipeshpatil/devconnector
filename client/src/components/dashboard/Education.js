import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const Education = ({ education }) => {
  const educations = education.map((edu) => {
    const { _id, school, degree, from, to } = edu;
    return (
      <tr key={_id}>
        <td>{school}</td>
        <td className="hide-sm">{degree}</td>
        <td>
          <Moment format="YYYY-MM-DD">{from}</Moment> -{" "}
          {!!to ? <Moment format="YYYY-MM-DD">{to}</Moment> : " Now"}
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2">Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
