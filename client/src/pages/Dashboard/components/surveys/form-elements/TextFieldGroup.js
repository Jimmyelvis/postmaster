/*
  A reuseable Text field group component that can be used across the application
*/

import className from "classnames";

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

  const formClasses = className(
    'form-control',
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
      </div>
    );
  
  
  
};



TextFieldGroup.defaultProps = {
  type: 'text',
  iconPosition: 'left'
};


export default TextFieldGroup;
