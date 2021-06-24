import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import LoginStack from "./LoginStack";
import HomeStack from "./HomeStack";
import InformeStack from "./InformeStack";
import { AuthContext } from "../context/AuthContext";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { auth } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="login"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#1694bc",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeStack}
          options={{ title: "Inicio", tabBarVisible: true }}
        />
        <Tab.Screen
          name="informes"
          component={InformeStack}
          options={{ title: "Informes", tabBarVisible: true }}
        />
        {
          <Tab.Screen
            name="login"
            component={LoginStack}
            options={{
              title: "Iniciar sesión",
              tabBarVisible: false,
              tabBarButton: () => null,
            }}
          />
        }
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "home":
      iconName = "auto-stories";
      break;
    case "account":
      iconName = "account-circle";
      break;
    case "informes":
      iconName = "description";
    default:
      break;
  }
  return <Icon type="material-icons" name={iconName} size={35} color={color} />;
}
