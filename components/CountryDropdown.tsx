"use client";
import React from "react";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

const countryOptions = [
  { value: "US", label: "US", flag: "US" },
  { value: "GB", label: "GB", flag: "GB" },
  { value: "CA", label: "CA", flag: "CA" },
  { value: "FR", label: "FR", flag: "FR" },
  { value: "IN", label: "IN", flag: "IN" },
  // Add more countries as needed
];

const CountryDropdown = () => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent", // Set the background to transparent
      border: "none", // Remove the border
      boxShadow: "none", // Remove the default box shadow
      color: "white", // Set text color to white
    }),
    option: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "10px",
      color: "black", // Default option text color
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      color: "white", // Set selected value text color to white
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "white", // Set placeholder text color to white
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      display: "none", // Remove the dropdown indicator container (and separator)
    }),
  };

  const formatOptionLabel = ({ value, label, flag }: any) => (
    <div className="flex items-center">
      <ReactCountryFlag
        countryCode={flag}
        svg
        style={{ width: 20, height: 20 }}
        className="mr-2"
      />
      <span>{label}</span>
    </div>
  );

  return (
    <Select
      defaultValue={countryOptions.find((option) => option.value === "IN")}
      options={countryOptions}
      styles={customStyles}
      formatOptionLabel={formatOptionLabel}
      placeholder="Select a country"
      className="mr-2"
    />
  );
};

export default CountryDropdown;
