import React from "react";

// Define the types for the props using a TypeScript interface
interface ToggleOfflineModeProps {
  isOffline: boolean;
  toggleOffline: () => void;
}

// Define a functional component called ToggleOfflineMode
// It receives two props: a boolean flag `isOffline` and a function `toggleOffline`
const ToggleOfflineMode = ({ isOffline, toggleOffline }: ToggleOfflineModeProps) => {
  return (
    // Render a button. When it's clicked, call the toggleOffline function
    <button onClick={toggleOffline}>
      {isOffline ? "Go Online" : "Go Offline"}
    </button>
  );
};

export default ToggleOfflineMode;
