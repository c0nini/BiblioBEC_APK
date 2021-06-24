import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({ auth: null, setAuth: null });
const initialState = {
  rut_usr: "",
  nombre: "",
  apellido_p: "",
  apellido_m: " ",
  direccion: "",
  telefono: "",
  correo: "",
  tipo_usuario: "",
  password: "",
  foto: "",
};
const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(initialState);

  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem("auth");
      const authData = JSON.parse(authDataString || initialState);
      setAuthState(authData);
    } catch (err) {
      setAuthState({});
    }
  };

  const setAuth = async (auth = initialState) => {
    try {
      await AsyncStorage.setItem("auth", JSON.stringify(auth));
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
