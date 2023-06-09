
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const timeString = `${hours}:${minutes}:${seconds}`;
      setTime(timeString);
    };

    // Update the time initially
    updateTime();

    // Update the time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(date);

  return (
    <div>
      <h1>Welcome to Whatsapp Ghana!</h1>
      <h3>Today is: {today}</h3>
      <h3>The time is: {time}</h3>
    </div>
  );
};

export default Home;
