import React from "react";
import DropDown from "react-dropdown";
import "./drop-down.scss";
import arrow from "../../../../assets/icons/arrow-low.svg";

export function DropDownAb(props) {
  const {
    options,
    title,
    placeholder,
    className,
    arrowWidth,
    onChange,
    value,
  } = props;

  return (
    <>
      <div className="container-select">
        <label>{title}</label>
        <div className="arrow-img">
          <img className={arrowWidth} src={arrow} alt="arrow to down" />
        </div>
        <DropDown
          className={className}
          placeholderClassName="place"
          menuClassName="menu"
          controlClassName="control"
          options={options}
          value={value}          
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}
