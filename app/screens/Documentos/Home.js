import { size } from "lodash";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import Loading from "../../components/Loading";
import Search from "../../components/Search";

export default function Home() {
  const [libros, setLibros] = useState([]); //Base de datos todos los libros
  const [librosVisibles, setLibrosVisibles] = useState([]); //Los libros visibles y filtrados

  useEffect(() => {
    let mounted = true;
    getList().then((resp) => {
      if (mounted) {
        setLibros(resp.data);
        setLibrosVisibles(resp.data);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <View>
      <Search
        setLibrosVisibles={setLibrosVisibles}
        libros={libros}
        tipo={"documentos"}
      />
      {size(libros) > 0 ? (
        <FlatList
          data={librosVisibles}
          renderItem={(documento) => <Documento documento={documento} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Loading isVisible={true} text="Cargando..." />
      )}
    </View>
  );
}

function getList() {
  return fetch("http://192.168.0.13:8000/api/documentos/").then((data) =>
    data.json()
  );
}

function Documento(props) {
  const { documento } = props;
  const { imagen, titulo, autor, editorial } = documento.item;
  return (
    <View>
      <View style={styles.viewDocumento}>
        <View style={styles.viewDocumentoImagen}>
          <Image
            style={styles.imageDocumento}
            resizeMode="cover"
            source={{ uri: "data:image/png;base64," + imagen }}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
        </View>
        <View>
          <Text style={styles.documentoTitulo}>{titulo}</Text>
          <Text style={styles.documentoAutor}>{autor}</Text>
          <Text style={styles.documentoAutor}>{editorial}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderDocumentos: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewDocumento: {
    flexDirection: "row",
    margin: 10,
  },
  viewDocumentoImagen: {
    marginRight: 15,
  },
  imageDocumento: {
    width: 100,
    height: 120,
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
});
