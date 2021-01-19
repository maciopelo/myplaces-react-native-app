import React, { useState } from "react";

export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleSwitch = () => setIsDark((previousState) => !previousState);
  const value = {
    theme: {
      value: isDark,
      onValueChange: toggleSwitch,
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
