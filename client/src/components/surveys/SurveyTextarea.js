// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ textarea, input, label, placeholder, meta:{ error, touched } }) => {
   console.log('====================================');
   console.log(error);
   console.log('====================================');

 
  return (
    <React.Fragment>
      <label>{label}</label>
      <textarea 
         rows="6"
         placeholder={placeholder}
         // autoComplete="off"
         // onBlur={input.onBlur}
         // onChange={input.onChange}
         {...input} 
      />
      <div className="invalid">
         {touched && error}
      </div>
    </React.Fragment>
  );


}
