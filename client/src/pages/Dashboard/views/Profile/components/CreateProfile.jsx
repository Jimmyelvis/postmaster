import React, { useState, useEffect } from 'react'
import { Panel } from 'components/ui/Layout/Panel'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TextFieldGroup from 'components/ui/Forms/TextFieldGroup';
import TextAreaFieldGroup from 'components/ui/Forms/TextAreaFieldGroup';
import { createProfile } from 'ReduxStore';

export const CreateProfile = () => {

  const dispatch = useDispatch();
  
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


  const onSubmit = (e) => { 
    e.preventDefault();
    console.log(values);

    const profileData = {
      email,
      company_name,
      company_website,
      phone,
      company_address,
      company_city,
      company_state,
      company_zip,
      company_country,
      company_bio,
    };

    dispatch(createProfile(profileData));

   }

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  const reset = () => {
    setValues({
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

  }

  return (
    <div className ="create-profile">

      <form onSubmit={onSubmit} >
        <TextFieldGroup
          placeholder="* Company Email Address"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          info="Email address for your company"
          required
        />

        <TextFieldGroup
          placeholder="* Company Name"
          name="company_name"
          value={company_name}
          onChange={onChange}
          info="Name of your company"
          required
        />

        <TextFieldGroup
          placeholder="Company Website"
          name="company_website"
          value={company_website}
          onChange={onChange}
          info="Website for your company"
        />

        <TextFieldGroup
          placeholder="Company Phone Number"
          name="phone"
          value={phone}
          onChange={onChange}
          info="Phone number for your company"
        />

        <TextFieldGroup
          placeholder="Company Address"
          name="company_address"
          value={company_address}
          onChange={onChange}
          info="Address for your company"
        />

        <TextFieldGroup
          placeholder="Company City"
          name="company_city"
          value={company_city}
          onChange={onChange}
          info="City for your company"
        />

        <TextFieldGroup
          placeholder="Company State"
          name="company_state"
          value={company_state}
          onChange={onChange}
          info="State for your company"
        />

        <TextFieldGroup
          placeholder="Company Zip Code"
          name="company_zip"
          value={company_zip}
          type="number"
          onChange={onChange}
          info="Zip code for your company"
        />

        <TextFieldGroup
          placeholder="Company Country"
          name="company_country"
          value={company_country}
          onChange={onChange}
          info="Country for your company"
        />

        <TextAreaFieldGroup
          placeholder="Company Bio"
          name="company_bio"
          value={company_bio}
          onChange={onChange}
        />


        <div className="btn-group">
          <input type="button" onClick={() => reset()} value="Reset" className="btn btn--danger" />
          <input type="submit" value="Submit" className="btn btn--primary" />
        </div>
      </form>

    </div>
  )
}
