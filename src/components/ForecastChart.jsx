// import React from "react";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import DraggableLegend from "./DraggableLegend";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";




import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ForecastChart = () => {
  const chartRef = useRef();

   const forecastState = useSelector((state) => state.forecast);
    if (!forecastState) return null;

  const { data, currentIndex, windowSize, extraLines, searchTerm, lineOrder,lineColors } =
    forecastState;

  const visibleData = data.slice(currentIndex, currentIndex + windowSize);

  const allLines = lineOrder || ["actual", "forecast", "plan", ...extraLines];

  const isMatch = (name) =>
    searchTerm === "" || name.toLowerCase().includes(searchTerm);

  const { theme } = useContext(ThemeContext);

  const downloadChart = () => {
    if (!chartRef.current) return;

    html2canvas(chartRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "forecast-chart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };


  return (

     <div>
      

      <button  onClick={downloadChart}  style={{ padding: "10px", width: "150px",position: "fixed", top: "300px", right: "100px",borderRadius:"5px",color: "#c78917",
    border: "1px solid #cc8b12", }}> 📥 DOWNLOAD  </button>

      <div
        
        ref={chartRef}
        style={{
          width: "100%",
          height: 350,
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          background: theme === "dark" ? "#1e1e1e" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
          transition: "0.3s"
        }}
        >

          



    <ResponsiveContainer width="100%" height={"100%"}>
      <LineChart data={visibleData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="week" />
        <YAxis />

        <Tooltip />
        

        {allLines.map((line, index) => (
          <Line
          key={line}
          type="monotone"
          dataKey={line}
          stroke={lineColors?.[line] || "#8884d8"}
          strokeWidth={isMatch(line) ? 4 : 1}
          opacity={isMatch(line) ? 1 : 0.2}
        />
        ))}
      </LineChart>
    </ResponsiveContainer>
    </div>
    </div>
  );
};

export default ForecastChart;