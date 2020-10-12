import React from "react";
import PropTypes from "prop-types";

const TextInput = (props) => {
  let wrapperClass = "form-group";
  wrapperClass = props.error && " has-error";

  return (
    <>
      <div className={wrapperClass}>
        <label htmlFor={props.id}>{props.label}</label>
        <div className="field">
          <input
            type="text"
            id={props.id}
            onChange={props.onInputChange}
            name={props.name}
            className="form-control"
            value={props.value}
          />
        </div>
        {props.error && <div className="alert alert-danger">{props.error}</div>}
      </div>
    </>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
};

export default TextInput;
