

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
 




