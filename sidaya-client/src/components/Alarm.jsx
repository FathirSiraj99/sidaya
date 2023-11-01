import React, { useEffect, useState } from "react";

const Alarm = ({ time }) => {
  const [alarmPlayed, setAlarmPlayed] = useState(false);

  const trimTime = (timeString) => {
    return timeString.substring(0, 16);
  };

  useEffect(() => {
    let checkTime;

    const playAlarm = () => {
      const audioElement = new Audio("/assets/alarm.mpeg");
      audioElement.play();
      setAlarmPlayed(true);
    };

    const checkAlarm = () => {
      const timezoneOffset = new Date().getTimezoneOffset();
      const currentTime = new Date(Date.now() - timezoneOffset * 60000).toISOString();
      if (trimTime(time) === trimTime(currentTime) && !alarmPlayed) {
        playAlarm();
      }
    };

    checkTime = setInterval(checkAlarm, 1000);

    return () => {
      clearInterval(checkTime);
    };
  }, [time, alarmPlayed]);

  return null;
};

export default Alarm;
