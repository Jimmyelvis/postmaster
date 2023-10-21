/*
  A reuseable TextArea field group component that can be used across the application
*/

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  rows,
  required,
}) => {
  return (
    <div className="field-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};


// defualt props
TextAreaFieldGroup.defaultProps = {
  type: "text",
  rows: "8"
};


export default TextAreaFieldGroup;
