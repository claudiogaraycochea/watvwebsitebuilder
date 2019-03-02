import React from 'react';

export const copyObj = (str = '') => {
  return JSON.parse(JSON.stringify(str));
}

export const ejfunc = () => {
  return 'Retornando func';
}

export const LoadingSpinner = (value) => (
  (value) ? <div className="loading-spinner">Loading...</div> : null
);