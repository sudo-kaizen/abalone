import React, { useState } from 'react';

export default function useDropdown(label, id, defaultValue) {
  const [state, setState] = useState(defaultValue);
  const [options, setOptions] = useState([]);
  const Dropdown = () => {
    return (
      <label
        className="text-sm font-semibold tracking-wide text-gray-600 "
        htmlFor={id}
      >
        {label}
        <select
          onChange={(e) => setState(e.target.value)}
          defaultValue={state}
          id={id}
          className="block px-3 py-2 uppercase bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          name={id}
        >
          <option value="">All</option>
          {options.map((option) => (
            <option key={option} className="uppercase" value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  };
  return [state, Dropdown, setOptions];
}
