import React, { Component } from "react";

const ProfileInput = ({
  label,
  type,
  placeholder,
  id,
  value,
  name,
  description,
  onChange
}) => {
  return (
    <div className="form-group row">
      <div className="col-3 text-right">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="col-9">
        <input
          type={type}
          className="form-control"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
        <h5 className="profile-note">{description}</h5>
      </div>
    </div>
  );
};

export default ProfileInput;
