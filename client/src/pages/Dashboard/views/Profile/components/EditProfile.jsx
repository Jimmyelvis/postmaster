import React, { useState, useEffect } from "react";
import { updateProfile } from "ReduxStore";
import { useSelector, useDispatch } from "react-redux";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import TextAreaFieldGroup from "components/ui/Forms/TextAreaFieldGroup";
import { Button } from "components/ui/buttons";

export const EditProfile = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    company_name: "",
    company_website: "",
    phone: "",
    company_address: "",
    company_city: "",
    company_state: "",
    company_zip: "",
    company_country: "",
    company_bio: "",
  });

  const { email, company_name, company_website, phone, company_address, company_city, company_state, company_zip, company_country, company_bio } = values;

  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile) {
      setValues((prevValues) => ({
        ...prevValues,
        email: profile?.email || "",
        company_name: profile?.company_name || "",
        company_website: profile?.company_website || "",
        phone: profile?.phone || "",
        company_address: profile?.company_address || "",
        company_city: profile?.company_city || "",
        company_state: profile?.company_state || "",
        company_zip: profile?.company_zip || "",
        company_country: profile?.company_country || "",
        company_bio: profile?.company_bio || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const formatLabel = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const submitUpdate = () => {
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
    dispatch(updateProfile(profileData));
  };

  return (
    <div className="edit-profile">
      {Object.entries(values).map(([key, value]) => (
        <>
          {/*
            Check if the profile exists and if the key exists in the profile object 
          */}
          {key === "company_bio" ? (
            <TextAreaFieldGroup name={key} value={value} onChange={handleChange} placeholder={formatLabel(key)} />
          ) : (
            <TextFieldGroup name={key} value={value} onChange={handleChange} placeholder={formatLabel(key)} />
          )}
        </>
      ))}

      <Button className="btn--primary" onClick={submitUpdate}>
        Submit
      </Button>
    </div>
  );
};
