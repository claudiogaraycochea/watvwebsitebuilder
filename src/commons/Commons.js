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

export const dateFormat = (value) => {
  const date = new Date(value);
  const formatter = new Intl.DateTimeFormat("en-US");
  formatter.format(date);
  return formatter.format(date);
}


export const showModal = (data, props) => {
  return (  
    <div className="modal-wrapper">
      <div className="modal-box">
        <div className="modal-header">{data.title} <button onClick={(e) => props.handleCloseModuleProperties()} className="btn small">Close</button></div>  
        <div className="modal-content">{data.componentChild}</div>
        <div className="modal-footer"><button onClick={(e) => props.handleCloseModuleProperties()} className="btn btn-primary">Ok</button></div>
      </div>
    </div>
  );
}