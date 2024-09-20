"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

const localeOptions = [
  { value: "es", label: "Spanish", flag: "ES" }, // "es" for Spanish (flag is Spain)
  { value: "ca", label: "Catalan", flag: "ES" }, // "ca" for Catalan (flag is Spain)
  { value: "fr", label: "French", flag: "FR" }, // "fr" for French
  { value: "it", label: "Italian", flag: "IT" }, // "it" for Italian
  { value: "ko", label: "Korean", flag: "KR" }, // "ko" for Korean
  { value: "pt", label: "Portuguese", flag: "PT" }, // "pt" for Portuguese (Portugal)
  { value: "ro", label: "Romanian", flag: "RO" }, // "ro" for Romanian
  { value: "en", label: "English", flag: "IN" }, // "ro" for Romanian
];

const CountryDropdown = () => {
  const router = useRouter();
  const params = useParams();
  const [selectedLocale, setSelectedLocale] = useState(localeOptions[0]);

  useEffect(() => {
    const currentLocale = params?.locale || "en"; // Fallback to 'en' if locale is not present
    const matchingOption = localeOptions.find(
      (option) => option.value === currentLocale
    );
    setSelectedLocale(matchingOption || localeOptions[0]);
  }, [params?.locale]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      color: "white",
    }),
    option: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "10px",
      color: "black",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      color: "white",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 0,
      borderRadius: 0,
      overflow: "hidden", // Prevent scrollbar by hiding overflow
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "none", // Remove max-height to prevent scrollbar
      padding: 0,
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
      <span>{flag}</span>
    </div>
  );

  const handleChange = (selectedOption: any) => {
    const newLocale = selectedOption.value;
    router.push(`/${newLocale}`);
  };

  return (
    <Select
      value={selectedLocale}
      options={localeOptions}
      styles={customStyles}
      formatOptionLabel={formatOptionLabel}
      placeholder="Select a language"
      onChange={handleChange}
      className="mr-2"
    />
  );
};

export default CountryDropdown;
