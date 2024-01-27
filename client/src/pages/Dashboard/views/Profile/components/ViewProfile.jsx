import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';


export const ViewProfile = () => {

  const [values, setValues] = useState({
    email: '',
    company_name: '',
    company_website: '',
    phone: '',
    company_address: '',
    company_city: '',
    company_state: '',
    company_zip: '',
    company_country: '',
    company_bio: '',
  });


  const { email, company_name, company_website, phone, company_address, company_city, company_state, company_zip, company_country, company_bio } = values;

  const apiResponse = useSelector(state => state.profile); 
  const profile = apiResponse.profile.profile;

  useEffect(() => {
    if (profile) {
      setValues(prevValues => ({
        ...prevValues,
        email: profile?.email || '',
        company_name: profile?.company_name || '',
        company_website: profile?.company_website || '',
        phone: profile?.phone || '',
        company_address: profile?.company_address || '',
        company_city: profile?.company_city || '',
        company_state: profile?.company_state || '',
        company_zip: profile?.company_zip || '',
        company_country: profile?.company_country || '',
        company_bio: profile?.company_bio || '',
      }));
    }
  }, [profile]);

  const formatLabel = (str) => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div className='view-profile'>
       {Object.entries(values).map(([key, value]) => (
        <>
        { /*
          Check if the profile exists and if the key exists in the profile object 
        */}
         {
            profile && profile[key] ? (
              <div className='profile-field'>
                <div className='profile-field-label'>{formatLabel(key)}</div>
                <div className='profile-field-value'>{profile[key]}</div>
              </div>
            ) : null
            
         }
        </>
      ))}

    </div>
  )
}
