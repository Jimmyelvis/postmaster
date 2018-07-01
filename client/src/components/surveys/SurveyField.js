// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {

  return (
     <div>
        <label>{label}</label>
        <input {...input} />
        <div className="orange-text" style={{ marginBottom: '10px' }}>
        {touched && error}
      </div>
     </div>
  );


}
