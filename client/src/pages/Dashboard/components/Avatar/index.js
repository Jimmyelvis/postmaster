import React from 'react';

export const Avatar = ({ email }) => {
  // Extract the first letter and capitalize it
  const firstLetter = email.charAt(0).toUpperCase();

  return <div className="avatar">{firstLetter}</div>;
};