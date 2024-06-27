import React, { useEffect, useState } from "react";
import "./singleOperatingDay.css";

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SingleOperatingDay = ({
  date,
  nonOperatingDays,
  setNonOperatingDays,
}) => {
  
  const formatDate = (date) => {
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
  }

  const [active, setActive] = useState(!nonOperatingDays?.includes(formatDate(date)));

  const handleClick = () => {
    if (nonOperatingDays?.includes(formatDate(date))) {
      let val = nonOperatingDays.filter((item) => {
        return item != formatDate(date);
      });
      setNonOperatingDays(val);
    } else {
      setNonOperatingDays([...nonOperatingDays, formatDate(date)]);
    }
    setActive((prev) => !prev);
  };

  useEffect(() => {
    setActive(!nonOperatingDays?.includes(formatDate(date)));
  }, [nonOperatingDays]);
  return (
    <div
      className={`single-operating-day-wrapper ${
        active ? "active" : "inactive"
      }`}
      onClick={handleClick}
    >
      <div className="date">
        {date.getDate()} {monthNames[date.getMonth()]}, {date.getFullYear()}
      </div>
      <div className="day">{week[date.getDay()]}</div>
    </div>
  );
};

export default SingleOperatingDay;
