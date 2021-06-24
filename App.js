import React from "react";
import Navigation from "./app/navigation/Navigation";
import { AuthProvider } from "./app/context/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
