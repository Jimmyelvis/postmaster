// src/components/Alert.js
import React from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

export const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  const showAlerts = alerts.map((alert, index) => (
    <div
      key={alert.id}
      className={'alert alert-' + alert.alertType}
      style={{ 
        top: `${(index + 1) * 5.5 }rem` 
      }}
    >
      {alert.msg}
    </div>
  ));

  if (alerts !== null && alerts.length > 0) {
    return createPortal(showAlerts, document.querySelector('#alerts'));
  } else {
    return null;
  }
};


