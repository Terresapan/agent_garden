import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the context data
interface ThemeContextData {
  theme: string;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

// Define the props for the ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Create the ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = 'dark'; // Always dark theme

  // Effect to update documentElement class
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    // Ensure light class is not present if it was somehow added externally
    root.classList.remove('light'); 
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
