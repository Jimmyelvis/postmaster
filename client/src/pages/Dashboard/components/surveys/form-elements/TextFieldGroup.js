/*
  A reuseable Text field group component that can be used across the application
*/

import className from "classnames";
import { useSelector, useDispatch } from 'react-redux';


const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  icon,
  iconClassname,
  iconClickFunction,
  iconPosition,
  required,
  ...rest
}) => {

  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);


  const formClasses = className(
    `form-control ${uiMode === "dark" ? "form-control-dark" : ""}`,
    {},
  )

  const iconClasses = className(
    'inputField-icon',
    {
      'inputField-icon-right': iconPosition === 'right',
    },
  )

    return (
      <div className="field-group">
        <input
          type={type}
          className={formClasses}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
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



TextFieldGroup.defaultProps = {
  type: 'text',
  iconPosition: 'left'
};


export default TextFieldGroup;
