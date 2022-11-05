import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
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
          <button
            onClick={() => deleteEducation(_id)}
            className="btn btn-danger"
          >
            Delete
          </button>
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
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
