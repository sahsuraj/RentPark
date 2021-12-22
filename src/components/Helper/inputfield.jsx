import React, { Component } from "react";

const InputField = ({
    name,
    onChange,
    value,
    placeholder,
    iconClassName,
    type
}) => {
    return (
        <div>
            <div className="input-group">
                <input
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
                {iconClassName ? (
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon">
                            <i className={iconClassName} />
                        </span>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default InputField;
