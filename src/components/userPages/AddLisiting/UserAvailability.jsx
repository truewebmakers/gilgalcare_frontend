import React from "react";

export default function UserAvailability({
  availability,
  setAvailability,
  enabledDays,
  setEnabledDays,
}) {
  // Handle adding new time slot
  const handleAddTime = (day) => {
    setAvailability({
      ...availability,
      [day]: [...availability[day], { start: "", end: "" }],
    });
  };

  // Handle input changes
  const handleInputChange = (day, index, field, value) => {
    const updatedTimes = [...availability[day]];
    updatedTimes[index][field] = value;
    setAvailability({ ...availability, [day]: updatedTimes });
  };

  // Handle day enable/disable toggle
  const handleChecked = (day, e) => {
    setEnabledDays({ ...enabledDays, [day]: e.target.checked });
  };

  // Handle removing a time slot
  const handleDeleteTime = (day, index) => {
    const updatedTimes = availability[day].filter((_, idx) => idx !== index);
    setAvailability({ ...availability, [day]: updatedTimes });
  };

  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
      <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between align-items-center">
        <h5 className="list-title">Available days and times</h5>
        <p>
          Keep this up to date so you get booked for the time that suits you.
        </p>
      </div>
      <div className="col-lg-14">
        <div className="availability-container">
          {Object.keys(availability).map((day, index) => (
            <div key={day} className="day-section">
              <div className="day-header">
                <div className="col-sm-3 mb4">
                  <label className="heading-color ff-heading fw500">
                    {day}
                  </label>
                  <div className="switch-style1">
                    <div className="form-check form-switch mb20">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`flexSwitchCheckDefault-${index}`}
                        checked={enabledDays[day]}
                        onChange={(e) => handleChecked(day, e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {enabledDays[day] &&
                availability[day].map((time, idx) => (
                  <div
                    key={idx}
                    className="time-row d-flex align-items-center mb-2"
                  >
                    <input
                      type="time"
                      value={time.start}
                      onChange={(e) =>
                        handleInputChange(day, idx, "start", e.target.value)
                      }
                      placeholder="Start time"
                    />
                    <input
                      type="time"
                      value={time.end}
                      onChange={(e) =>
                        handleInputChange(day, idx, "end", e.target.value)
                      }
                      placeholder="End time"
                    />
                    <button
                      className="delete-time-btn ml-2"
                      onClick={() => handleDeleteTime(day, idx)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              {enabledDays[day] && (
                <button
                  className="add-time-btn"
                  onClick={() => handleAddTime(day)}
                >
                  + Add another time
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
