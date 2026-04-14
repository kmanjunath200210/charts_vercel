import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import  store  from "./app/store";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = "YOUR_clerk_key";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
   <ThemeProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
      
    </ThemeProvider>
  </Provider>
);