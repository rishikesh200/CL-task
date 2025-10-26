import React from "react";
import { schemaOptions } from "../data";

const Dropdown = ({ selectedValue, onChange, usedValues }) => {
  const availableOptions = schemaOptions.filter(
    (opt) => !usedValues.includes(opt.value) || opt.value === selectedValue
  );

  return (
    <select
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      className="schema-dropdown"
    >
      <option value="">-- Select schema --</option>
      {availableOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
