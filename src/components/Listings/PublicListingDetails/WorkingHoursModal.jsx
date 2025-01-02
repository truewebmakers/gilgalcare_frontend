import moment from "moment";
import React from "react";

const WorkingHoursModal = ({ workingHours }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const isBusinessClosed = () => {
    const today = new Date();
    const currentDay = days[today.getDay() - 1]; // Get today's name (Sunday is 0)
    const currentTime = today.toTimeString().slice(0, 5); // Current time in "HH:mm" format

    const schedules = workingHours[currentDay] || [];
    const isOpen = schedules?.some((schedule) => {
      const start = schedule?.start?.slice(0, 5); // Format "HH:mm"
      const end = schedule?.end?.slice(0, 5); // Format "HH:mm"
      return currentTime >= start && currentTime <= end; // Check if current time is within range
    });

    return !isOpen; // Return true if no schedules match
  };

  const getDaySchedule = (day) => {
    const schedules = workingHours[day]?.filter(
      (schedule) => schedule?.start && schedule?.end
    );

    if (!schedules || schedules.length === 0) {
      return "Closed";
    }

    // Check isEnabled flag for each schedule
    return schedules
      .map((schedule, index) => {
        if (schedule.isEnabled === 0) {
          return "Closed";
        } else if (schedule.isEnabled === 1) {
          return `${formatTime(schedule.start)} - ${formatTime(schedule.end)}`;
        }
        return "Closed"; // Default to "Closed" if no valid isEnabled value
      })
      .join(", ");
  };

  const formatTime = (time) => {
    if (!time) return ""; // Handle empty time slots
    const [hours, minutes] = time?.split(":");
    const suffix = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12 || 12)?.toString();
    return `${formattedHours}:${minutes} ${suffix}`;
  };

  const getFormattedDateTime = () => {
    return moment().format("DD MMMM YYYY h:mm a") + " local time";
  };

  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">
          <i className="feather-clock" /> Working Hours
        </h4>
        <span
          style={{
            color: isBusinessClosed() ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {isBusinessClosed() ? "Closed" : "Open"}
        </span>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {days?.map((day, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{day}</span>
              <span>{getDaySchedule(day)}</span>
            </li>
          ))}
        </ul>
        <p className="text-end text-muted mt-2">{getFormattedDateTime()}</p>
      </div>
    </div>
  );
};

export default WorkingHoursModal;
