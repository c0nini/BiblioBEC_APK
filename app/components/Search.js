import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";

export default function Search(props) {
  const { setLibrosVisibles, libros, tipo, setInformesVisibles, prestamos } =
    props;

  const setSearch = (e) => {
    const palabraBuscar = e.trim();

    if (tipo == "prestamos") {
      if (palabraBuscar.length === 0) {
        setInformesVisibles(prestamos);
      }
      const resultadoPrestamos = prestamos.filter(
        (item) =>
          item.rut_usr.toUpperCase().includes(palabraBuscar.toUpperCase()) ||
          item.nombre_usr.toUpperCase().includes(palabraBuscar.toUpperCase()) ||
          item.documento.toUpperCase().includes(palabraBuscar.toUpperCase())
      );
      setInformesVisibles(resultadoPrestamos);
    } else if (tipo == "documentos") {
      if (palabraBuscar.length === 0) {
        setLibrosVisibles(libros);
      }
      const resultadoLibros = libros.filter(
        (item) =>
          item.titulo.toUpperCase().includes(palabraBuscar.toUpperCase()) ||
          item.autor.toUpperCase().includes(palabraBuscar.toUpperCase())
      );
      setLibrosVisibles(resultadoLibros);
    }
  };

  return (
    <View>
      <SearchBar
        placeholder="Buscar"
        onChangeText={(e) => setSearch(e)}
        platform="android"
      />
    </View>
  );
}
