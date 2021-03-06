import React from 'react';

export const copyObj = (str = '') => {
  return JSON.parse(JSON.stringify(str));
}

export const ejfunc = () => {
  return 'Retornando func';
}

export const LoadingSpinner = (value) => (
  (value) ? <div className="loading-spinner"></div> : null
);

export const Notification = (value, typeClass) => (
  (value) ? <div className={`notification ${typeClass}`}>{value}</div> : null
);

export const redirectionBySession = () => (
  (sessionStorage.getItem('user_token')==='') ? console.log('No session') : null
);