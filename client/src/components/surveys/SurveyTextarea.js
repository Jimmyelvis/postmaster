// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ textarea, label, rows, meta: { error, touched } }) => {

 
  return (
     <div>
        <label>{label}</label>
        <rows>{20}</rows>
        <textarea>{ textarea }</textarea>
        <div className="error-text">
        {touched && error}
        </div>
     </div>
  );


}
