import React, { useState, useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Account/Login";
import Account from "../screens/Account/Account";

import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function LoginStack() {
  const navigation = useNavigation();
  const { auth } = useContext(AuthContext);
  const [isLogged, setIsLogged] = useState();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Iniciar sesión" }}
      />
    </Stack.Navigator>
  );
}
