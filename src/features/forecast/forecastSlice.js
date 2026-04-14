import { createSlice } from "@reduxjs/toolkit";
import { forecastData } from "./forecastData";

const loadState = () => {
  try {
    const savedState = localStorage.getItem("forecastState");
    if (savedState === null) return null;
    return JSON.parse(savedState);
  } catch (err) {
    return null;
  }
};

const persistedState = loadState();


const forecastSlice = createSlice({
  name: "forecast",

  initialState: persistedState || {
    data: forecastData,
    currentIndex: 0,
    windowSize: 17,
    extraLines: [],
    searchTerm: "",
    lineOrder: ["actual", "forecast", "plan"],
    lineColors: {
    actual: "#c54848",
    forecast: "#00aa00",
    plan: "#0000ff"
  }
  },

  reducers: {
    incrementWeek: (state) => {
      state.windowSize = Math.min(state.windowSize + 1,state.data.length);
    },
    decrementWeek: (state) => {
    state.windowSize -= 1
        },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.toLowerCase();
     },

    addLine: (state) => {
      const numbers = state.lineOrder
    .filter(line => line.startsWith("Line"))
    .map(line => parseInt(line.replace("Line","")));

  const nextNumber = numbers.length ? Math.max(...numbers) + 1 : 1;
  const lineName = `Line${nextNumber}`;
      state.extraLines.push(lineName);
      state.lineOrder.push(lineName);

      state.data.forEach((item) => {
        item[lineName] = Math.floor(Math.random() * 20000) + 50;
        });

        if (!state.lineColors) state.lineColors = {};

state.lineColors[lineName] =
  "#" + Math.floor(Math.random() * 16777215).toString(16);

      
    },

    removeLine: (state) => {
      

      if (state.extraLines.length === 0) return;

  
  const lastLine = state.extraLines[state.extraLines.length - 1];

  
  state.extraLines = state.extraLines.filter(line => line !== lastLine);

  
  state.lineOrder = state.lineOrder.filter(line => line !== lastLine);

  delete state.lineColors[lastLine];
        
        state.data.forEach((item) => {
          delete item[lastLine];
        });
        if (state.lineColors) delete state.lineColors[lastLine]
      
    },
    setLineOrder: (state, action) => {
    state.lineOrder = action.payload;
  },
    setLineColor: (state, action) => {   
      const { line, color } = action.payload;
      if (!state.lineColors) state.lineColors = {};
  state.lineColors[line] = color;
    }

  },
});




export const { incrementWeek, decrementWeek, addLine, removeLine,setSearchTerm ,setLineOrder,setLineColor} = forecastSlice.actions;
export default forecastSlice.reducer;