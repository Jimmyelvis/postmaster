/*
  A reuseable TextArea field group component that can be used across the application
*/

import React from "react";
import className from "classnames";
import { useSelector, useDispatch } from 'react-redux';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  rows
}) => {

  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);

  const formClasses = className(
    `form-control ${uiMode === "dark" ? "form-control-dark" : ""}`,
    {},
  )


  return (
    <div className="form-group">
      <textarea
        className={formClasses}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
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
