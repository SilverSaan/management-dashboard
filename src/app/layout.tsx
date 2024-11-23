"use client";

import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, CircularProgress, darkScrollbar, Typography } from "@mui/material";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import NavbarLogin from "@/components/NavbarLogin";

const draculaThemeColors = {
  background: "#282a36",
  text: "#f8f8f2",
  primary: "#ff79c6",
  secondary: "#bd93f9",
  error: "#ff5555",
  success: "#50fa7b",
  warning: "#f1fa8c",
  border: "#6272a4",
  darker: "#0e0d11"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // State to track the theme
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
  const pathname = usePathname(); // Get the current route
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "dracula" | undefined>(undefined);



  // Effect to read from localStorage only after mounting on client side
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setThemeMode(
      storedTheme === "dark" || storedTheme === "dracula" ? storedTheme : "light"
    );
  }, []);
  

  const draculaTheme = createTheme({
    palette: {
        mode: "dark", // Dracula is a dark theme
        background: {
          default: draculaThemeColors.background,
        },
        text: {
          primary: draculaThemeColors.text,
        },
        primary: {
          main: draculaThemeColors.primary,
        },
        secondary: {
          main: draculaThemeColors.secondary,
        },
        error: {
          main: draculaThemeColors.error,
        },
        success: {
          main: draculaThemeColors.success,
        },
        warning: {
          main: draculaThemeColors.warning,
        },
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: draculaThemeColors.background, // Custom background
              color: draculaThemeColors.text, // Text color
              border: `1px solid ${draculaThemeColors.border}`, // Optional: Border styling
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.3)", // Dracula-like shadow
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: draculaThemeColors.darker,
              color: draculaThemeColors.text
            },
          },
        },
      },
      typography: {
        fontFamily: "'Fira Code', Arial, sans-serif",
      },
    });
    

  // Memoize the theme to optimize re-renders
  const theme = useMemo(() => {
    switch (themeMode) {
      case "dark":
        return createTheme({
          palette: {
            mode: "dark",
            background: { default: "#121212" },
          },
          typography: { fontFamily: "'Fira Code', Arial, sans-serif" },
          components: {
            MuiCssBaseline: {
              styleOverrides: {
                body: darkScrollbar(),
              },
            },
          },
        });
      case "dracula":
        return draculaTheme; // Use the Dracula theme here
      default: // "light"
        return createTheme({
          palette: {
            mode: "light",
            background: { default: "#ffffff" },
          },
          typography: { fontFamily: "'Fira Code', Arial, sans-serif" },
        });
    }
  }, [themeMode]);
  

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme =
      themeMode === "light" ? "dark" : themeMode === "dark" ? "dracula" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  

  // Prevent hydration issues: show loading until theme is loaded
  if (themeMode === undefined) {
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
              toggleTheme={toggleTheme}
              themeMode={themeMode}
            />
          ): (
            <NavbarLogin 
              toggleTheme={toggleTheme}
              themeMode={themeMode}/>
          )}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
