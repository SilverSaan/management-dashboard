"use client";

import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, CircularProgress, darkScrollbar, Typography } from "@mui/material";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import NavbarLogin from "@/components/NavbarLogin";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // State to track the theme
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
  const pathname = usePathname(); // Get the current route


  // Effect to read from localStorage only after mounting on client side
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme ? storedTheme === "dark" : false); // Set the theme from localStorage
  }, []);

  // Memoize the theme to optimize re-renders
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          background: {
            default: isDarkMode ? "#121212" : "#ffffff",
          },
        },
        typography: {
          fontFamily: "'Fira Code', Arial, sans-serif", // Apply Fira Code globally
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
            }),
          },
        },
      }),
    [isDarkMode]
  );

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Prevent hydration issues: show loading until theme is loaded
  if (isDarkMode === undefined) {
    return (
      <html lang="en">
        <body>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <CircularProgress color="secondary" size={150} />
          </Box>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {pathname !== "/login" ? (
            <Navbar
              toggleTheme={() => setIsDarkMode((prev) => !prev)}
              isDarkMode={isDarkMode}
            />
          ): (
            <NavbarLogin 
              toggleTheme={() => setIsDarkMode((prev) => !prev)}
              isDarkMode={isDarkMode}/>
          )}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
