// SurveyField contains logic to render a single
// label and text input
import React from 'react';

// export default ({ input, label, meta: { error, touched } }) => {


//   return (
//      <div>
//         <label>{label}</label>
//         <input {...input} />
//         <div className="error-text">
//         {touched && error}
//         </div>
//      </div>
//   );


// }


export default ({ input, label, placeholder, meta:{ error, touched } }) => {
   console.log('====================================');
   console.log(error);
   console.log('====================================');
   
   return (
      <React.Fragment>
         <label>{label}</label>
         <input 
            placeholder={placeholder}
            // autocomplete="off"
            {...input} 
         />
         <div className="invalid">
            {touched && error}
         </div>
      </React.Fragment>
   );
 
 
 };
 




