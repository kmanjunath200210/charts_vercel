// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../features/forecast/forecastSlice";
import useDebounce from "../hooks/useDebounce";

const SearchBar = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const debouncedValue = useDebounce(text, 500);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Search line name (actual, forecast, plan, line1...)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "10px", width: "250px",position: "fixed", top: "300px", right: "600px",borderRadius:"5px", }}
      />
    </div>
  );
};

export default SearchBar;