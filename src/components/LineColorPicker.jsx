import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLineColor } from "../features/forecast/forecastSlice";

const LineColorPicker = () => {

  const dispatch = useDispatch();

  const { lineOrder, lineColors } = useSelector((state) => state.forecast);

  const handleColorChange = (line, color) => {
    dispatch(setLineColor({ line, color }));
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>Line Colors</h3>

      {lineOrder.map((line) => (
        <div key={line} style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>{line}</label>

          <input
            type="color"
            value={lineColors[line]}
            onChange={(e) =>
              handleColorChange(line, e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default LineColorPicker;