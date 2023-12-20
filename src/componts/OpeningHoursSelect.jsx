import React, { useState } from 'react';

const OpeningHoursSelect = ({ startHour, endHour, onChildData }) => {
  const [selectedHour, setSelectedHour] = useState("");
  // Generate an array of hours between start and end
  const hoursArray = [];
  let s = `${startHour}`;
  let e = `${endHour}`;
  const start = s.split(":");
  const startH = parseInt(start[0]);

  const end = e.split(":");
  const endH = parseInt(end[0]);

  for (let i = startH; i < endH; i++) {
    hoursArray.push(i);
  }

  // Call the callback function provided by the parent
  const sendDataToParent = (e) => {
    // Call the callback function provided by the parent with the selected hour
    onChildData(e);
  };

  return (
    <div>
      <select
        id="openingHours"
        onChange={(e) => {
          setSelectedHour(e.target.value);
          sendDataToParent(`${e.target.value}:00`)
           // Call the callback when an option is selected
        }}
        value={selectedHour}
      >
        <option value="00" disabled>
          Select an hour
        </option>
        {hoursArray.map((hour) => (
          <option key={hour} value={hour} >
            {hour}:00
          </option>
        ))}
      </select>
    </div>
  );
};

export default OpeningHoursSelect;
