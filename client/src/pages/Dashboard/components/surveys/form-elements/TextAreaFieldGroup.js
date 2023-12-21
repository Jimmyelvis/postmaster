/*
  A reuseable TextArea field group component that can be used across the application
*/

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';


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

  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);

  return (
    <div className="field-group">
      <textarea
        className={
          classnames(
            `form-control ${uiMode === "dark" ? "form-control-dark" : ""}`, 
            {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
      />
      
      {
          error && (
            <h4 className="heading-4 error">{error}</h4>
          )
        }
    </div>
  );
};


// defualt props
TextAreaFieldGroup.defaultProps = {
  type: "text",
  rows: "8"
};


export default TextAreaFieldGroup;
