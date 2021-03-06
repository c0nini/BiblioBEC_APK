import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Documentos/Home";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ title: "Documentos disponibles" }}
      />
    </Stack.Navigator>
  );
}
