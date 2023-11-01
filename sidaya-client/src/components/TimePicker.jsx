import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";

const TimePicker = ({ name, value, handleChange }) => {
  const [selectedHour, setSelectedHour] = useState(value ? value.split(":")[0] : "00");
  const [selectedMinute, setSelectedMinute] = useState(value ? value.split(":")[1] : "00");

  const handleHourChange = (event) => {
    const { value } = event.target;
    setSelectedHour(value);
    const updatedTime = `${value}:${selectedMinute}`;
    handleChange({
      target: {
        name,
        value: updatedTime,
      },
    });
  };

  const handleMinuteChange = (event) => {
    const { value } = event.target;
    setSelectedMinute(value);
    const updatedTime = `${selectedHour}:${value}`;
    handleChange({
      target: {
        name,
        value: updatedTime,
      },
    });
  };

  return (
    <Box display="flex">
      <Box sx={{ marginRight: 2, width: "50%" }}>
        <FormControl variant="outlined" fullWidth required size="small">
          <Select
            value={selectedHour}
            onChange={handleHourChange}
            name={`${name}-hour`}
          >
            {Array.from({ length: 24 }, (_, index) =>
              index.toString().padStart(2, "0")
            ).map((hour) => (
              <MenuItem key={hour} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: "50%" }}>
        <FormControl variant="outlined" fullWidth required size="small">
          <Select
            value={selectedMinute}
            onChange={handleMinuteChange}
            name={`${name}-minute`}
          >
            {Array.from({ length: 60 }, (_, index) =>
              index.toString().padStart(2, "0")
            ).map((minute) => (
              <MenuItem key={minute} value={minute}>
                {minute}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TimePicker;
