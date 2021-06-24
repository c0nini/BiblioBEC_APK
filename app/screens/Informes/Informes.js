import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card, Image, Button } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import Search from "../../components/Search";

export default function Informes() {
  const { auth, setAuth } = useContext(AuthContext);
  const [prestamos, setPrestamos] = useState([]);
  const [informesVisibles, setInformesVisibles] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;
    getList(auth.rut_usr).then((resp) => {
      if (mounted) {
        setPrestamos(resp.data);
        setInformesVisibles(resp.data);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <View>
      <Search
        setInformesVisibles={setInformesVisibles}
        prestamos={prestamos}
        tipo={"prestamos"}
      />
      {size(prestamos) > 0 ? (
        <FlatList
          data={informesVisibles}
          renderItem={(prestamo) => (
            <Prestamo prestamo={prestamo} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Loading isVisible={true} text="Cargando..." />
      )}
    </View>
  );
}

function getList(rut_usr) {
  return fetch(`http://192.168.0.13:8000/api/prestamos/${rut_usr}/`).then(
    (data) => data.json()
  );
}

function Prestamo(props) {
  const { prestamo, navigation } = props;
  const {
    numero_pres,
    autor,
    tipo_pres,
    documento,
    fecha_pres,
    fecha_dev,
    rut_usr,
    estado,
    nombre_usr,
  } = prestamo.item;

  return (
    <View>
      <Card style={styles.viewCard}>
        <Text style={styles.documentoTitulo}>
          N° {numero_pres}. {documento} - {autor}
        </Text>
        <Card.Divider />
        <Text style={styles.documentoAutor}>{tipo_pres} </Text>
        <Text style={styles.documentoAutor}>RUT Usuario: {rut_usr} </Text>
        <Text style={styles.documentoAutor}>Nombre: {nombre_usr} </Text>
        <Text style={styles.documentoAutor}>Estado: {estado}</Text>
        <Text style={styles.documentoAutor}>Préstamo: {fecha_pres}</Text>
        <Text style={styles.documentoAutor}>Devolución: {fecha_dev}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderPrestamos: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewDocumento: {
    flexDirection: "row",
    margin: 80,
  },
  documentoTitulo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#214c78",
  },
  documentoAutor: {
    paddingTop: 1,
    fontSize: 17,
  },
  viewCard: {
    marginRight: 20,
    marginLeft: 20,
  },
  textLoader: {
    color: "#1694bc",
    fontSize: 17,
  },
});
