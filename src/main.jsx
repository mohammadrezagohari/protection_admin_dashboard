"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import "@fontsource/vazir";
import "./main.css";
import { Toaster } from "react-hot-toast";
import SortableProvider from "./context/SortableContext";
import { AuthProvider } from "./gard/context/AuthContext";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <MaterialTailwindControllerProvider>
              <SortableProvider>
                <App />
              </SortableProvider>
              <Toaster position="top-center" />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
