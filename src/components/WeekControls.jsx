import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementWeek, decrementWeek } from "../features/forecast/forecastSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WeekControls = () => {
  const dispatch = useDispatch();

  const windowSize  = useSelector((state) => state.forecast.windowSize);

  const handlePreviousWeek = () => {
    if (windowSize <= 3) {
      toast.error("You cannot reduce weeks below 3!");
      return;
    }

    dispatch(decrementWeek());
  };

  const handleNextWeek = () => {
    dispatch(incrementWeek());
  };

  return (
    <div>
      <button onClick={handlePreviousWeek}style={{ position: "fixed", top: "310px", left: "410px",boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",padding: "4px",
    color: "#04403a",
    border: "1px solid #092e2d",borderRadius:"5px", }}>
        ⬅ PRE WEEK
      </button>

      <button onClick={handleNextWeek}
      style={{ position: "fixed", top: "310px", left: "520px",boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",padding: "4px",
    color: "#234c4b",
    border: "1px solid #271010",borderRadius:"5px", }}>

        NEXT WEEK ➡
      </button>

      
      
    </div>
  );
};

export default WeekControls;