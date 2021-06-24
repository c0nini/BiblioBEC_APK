import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Input,
  Image,
} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

export default function Account() {
  const navigation = useNavigation();
  const { auth, setAuth } = useContext(AuthContext);

  async function onLogOut() {
    await setAuth();
    navigation.navigate("login");
  }

  return (
    <View>
      <Card>
        <View style={styles.containerImagen}>
          <Image
            style={styles.image}
            source={{ uri: "data:image/png;base64," + auth.foto }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <Card.Title style={styles.titulo}>
          {auth.nombre} {auth.apellido_p}
        </Card.Title>
        <Card.Divider />
        <Text style={styles.body}>RUT:</Text>
        <Text style={styles.descp}> {auth.rut_usr}</Text>
        <Text style={styles.body}>Tipo usuario:</Text>
        <Text style={styles.descp}> {auth.tipo_usuario}</Text>
        <Text style={styles.body}>Dirección:</Text>
        <Text style={styles.descp}> {auth.direccion}</Text>
        <Text style={styles.body}>Correo electrónico:</Text>
        <Text style={styles.descp}> {auth.correo}</Text>
        <Text style={styles.body}>Teléfono:</Text>
        <Text style={styles.descp}> {auth.telefono}</Text>
        <Button
          buttonStyle={styles.btnLogOut}
          title="Cerrar sesión"
          onPress={() => onLogOut()}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  btnLogOut: {
    marginTop: 20,
    backgroundColor: "#1694bc",
  },
  containerImagen: {
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    marginBottom: 2,
    color: "#214c78",
  },
  body: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descp: {
    fontSize: 17,
  },
});
