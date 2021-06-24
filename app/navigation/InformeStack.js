import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Informes from "../screens/Informes/Informes";

const Stack = createStackNavigator();

export default function InformeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="informes"
        component={Informes}
        options={{ title: "Préstamos en curso" }}
      />
    </Stack.Navigator>
  );
}
