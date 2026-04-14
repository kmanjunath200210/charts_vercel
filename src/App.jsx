import { useState, useEffect } from "react";
import "./App.css";
import Temp from"./components/Temp";
import WeekControls from "./components/WeekControls";
import ForecastChart from "./components/ForecastChart";
import LineControls from "./components/LineControls";
import SearchBar from "./components/SearchBar";
import DraggableLegend from "./components/DraggableLegend";
import ThemeToggle from "./components/ThemeToggle";
import SkeletonLoader from "./components/SkeletonLoader";

import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {SignedIn,SignedOut,UserButton,SignInButton,SignUpButton,} from "@clerk/clerk-react";

function App() {
  

  
  const forecastState = useSelector((state) => state.forecast);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    try {
      localStorage.setItem("forecastState", JSON.stringify(forecastState));
    } catch (err) {
      console.warn("Failed to save state to localStorage", err);
    }
  }, [forecastState]);

  return (
    <>
     <div className="headername">MY APPLICATION</div>

    <div
  style={{ position: "fixed", top: "10px", right: "10px" }}
  className="header">
   
  <div style={{
   display:"flex",gap:'10px'
  }}>
    <SignedOut>
     
      <SignInButton mode="modal">
        <button
          style={{
            
           
            padding: "8px 12px",
            border: "1px solid black",
            borderRadius: "6px",
            cursor: "pointer",
            gap:"10px",
          }}
        >
          Sign In
        </button>
      </SignInButton>

      <SignUpButton mode="modal">
        <button
          style={{
            
            
            padding: "8px 12px",
            border: "1px solid black",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </SignUpButton>
    </SignedOut>

    <SignedIn>
      <UserButton />
    </SignedIn>
  </div>
</div>

      
     

      
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
        <Temp />
        <div style={{ width: "1000px", margin: "auto" }}>
         <ThemeToggle />
          <ForecastChart />
          <SearchBar />
          
          <DraggableLegend />
          <WeekControls />
          <LineControls />
          <ToastContainer position="top-right" autoClose={3000} />
          </div>
          
        </>
      )}

      
      
    </>
  );
}

export default App;