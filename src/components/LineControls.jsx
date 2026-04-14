import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLine, removeLine } from "../features/forecast/forecastSlice";
import { toast } from "react-toastify";

const LineControls = () => {

  const dispatch = useDispatch();

  const extraLines = useSelector((state) => state.forecast.extraLines);

  const handleRemoveLine = () => {

    if (extraLines.length === 0) {
      toast.error("You cannot remove below 3 lines!");
      return;
    }

    dispatch(removeLine());
  };

  return (
    <div style={{ marginTop: "20px" }}>

      

      <button onClick={handleRemoveLine}style={{ position: "fixed", top: "300px", right: "300px",boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",padding: "10px",
    color: "#f03e3e",
    border: "1px solid #f03e3e",borderRadius:"5px", }}>
       − REMOVE LINE
      </button>

      <button onClick={() => dispatch(addLine())}style={{ position: "fixed", top: "300px", right: "450px",boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",padding: "10px",color: "#0fb61a",
    border: "1px solid #6acb1a" ,borderRadius:"5px", }}>
        ✚ ADD LINE
      </button>

    </div>
  );
};

export default LineControls;