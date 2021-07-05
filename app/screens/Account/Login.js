import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Input,
  Image,
} from "react-native-elements";
import { size, isEmpty } from "lodash";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { checkRut } from "../../utils/validations";

import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);

  const [formLogin, setFormLogin] = useState({ rut_usr: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const toastRef = useRef();

  // useEffect(() => {
  //   checkeaLogueado();
  // }, []);

  const onSubmit = async () => {
    if (isEmpty(formLogin.rut_usr) || isEmpty(formLogin.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
      return;
    }
    const resp = checkRut(formLogin.rut_usr);
    if (!resp.valido) {
      toastRef.current.show(resp.mensaje);
      return;
    }
    const response = await fetch(
      `http://192.168.0.7:8000/api/usuario/${formLogin.rut_usr}/${formLogin.password}`
    );
    const responseJson = await response.json();
    
    if (!responseJson.success) {
      toastRef.current.show(responseJson.error);
      return;
    }
    await setAuth(responseJson.data);
    responseJson.data.estado == 0 ? toastRef.current.show('Su cuenta está desactivada.') : navigation.navigate("account");
  };

  const onChange = (e, type) => {
    setFormLogin({ ...formLogin, [type]: e.nativeEvent.text });
  };

  const onClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAwareScrollView>
      <Image
        resizeMode={"contain"}
        source={require("../../images/logo.png")}
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <View style={styles.formContainer}>
          <Image
            resizeMode={"contain"}
            source={require("../../images/logo.png")}
          />

          <Input
            placeholder="RUT"
            maxLength={9}
            rightIcon={
              <Icon
                type="material-design"
                name="person"
                iconStyle={styles.iconRight}
              />
            }
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e, "rut_usr")}
          />
          <Input
            placeholder="Contraseña"
            rightIcon={
              <Icon
                type="material-design"
                name={showPassword ? "visibility-off" : "visibility"}
                iconStyle={styles.iconRight}
                onPress={onClick}
              />
            }
            containerStyle={styles.inputForm}
            password={!showPassword}
            secureTextEntry={!showPassword}
            onChange={(e) => onChange(e, "password")}
          />
          <Button
            title="Ingresar"
            onPress={onSubmit}
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
          />
        </View>
      </View>
      <Toast
        ref={toastRef}
        position="top"
        opacity={0.9}
        style={{ backgroundColor: "red" }}
        textStyle={{ color: "white" }}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
  btnLogin: {
    backgroundColor: "#1694bc",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
