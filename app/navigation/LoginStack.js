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

  // AsyncStorage.getItem("auth").then((resp) => {
  //   console.log({ resp: resp.rut_usr });
  //   if (resp.rut_usr) {
  //     setIsLogged(true);
  //   } else {
  //     setIsLogged(false);
  //   }
  // });

  // useEffect(() => {
  //   if (auth.rut_usr) {
  //     console.log("Si");
  //     navigation.navigate("account");
  //   } else {
  //     console.log("no");
  //     navigation.navigate("login");
  //   }
  // }, [auth]);

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
