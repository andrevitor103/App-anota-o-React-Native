import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [estado, setEstado] = useState("leitura");
  const [anotacao, setAnotacao] = useState("");
  const [anotacoes, setAnotacoes] = useState([]);
  const [titulo, setTitulo] = useState();

  useEffect(() => {
    (async () => {
      try {
        const list = await AsyncStorage.getItem("@anotacoes");
        console.log(list);
      } catch (e) {
        alert("Erro");
        console.log(e);
      }
    })();
  }, []);

  const storeData = async (value, label) => {
    try {
      //let value = JSON.stringify(anotacoes);
      await AsyncStorage.setItem("@anotacoes", "adadaa");
    } catch (e) {}
  };

  function listAnotations(list) {
    return list.map((content) => {
      return <Text style={styles.textAnotacao}>{content} </Text>;
    });
  }

  function salvar() {
    if (anotacao.length > 0) {
      setAnotacoes([anotacao, ...anotacoes]);
      setAnotacao("");
    }
    storeData(anotacoes, "@anotacoes");
    setEstado("leitura");
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.textHeader}>App de anotações {titulo}</Text>
      </View>

      {estado == "leitura" ? (
        <View style={styles.areaAnotacao}>{listAnotations(anotacoes)}</View>
      ) : (
        <View style={styles.textAnotacaoEdit}>
          <TextInput
            onChangeText={(text) => setAnotacao(text)}
            multiline={true}
            numberOfLines={5}
          ></TextInput>
        </View>
      )}

      {estado == "leitura" ? (
        <TouchableOpacity
          onPress={() => {
            setEstado("atualizando");
          }}
          style={styles.btnAnotacao}
        >
          <Text style={styles.btnAnotacaoTexto}>+</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setEstado("leitura");
          }}
          style={styles.btnSalvar}
        >
          <Text style={styles.btnTextoSalvar} onPress={() => salvar()}>
            Salvar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 30,
    backgroundColor: "#069",
    alignItems: "center",
  },
  textHeader: {
    color: "#fff",
    fontSize: 18,
  },
  areaAnotacao: {
    padding: 40,
  },
  textAnotacao: {
    fontSize: 13,
    paddingBottom: 20,
  },
  btnAnotacao: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 50,
    height: 50,
    backgroundColor: "#069",
    borderRadius: 25,
  },
  btnAnotacaoTexto: {
    color: "white",
    fontSize: 30,
    position: "relative",
    top: 3,
    textAlign: "center",
  },
  btnSalvar: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 80,
    height: 50,
    backgroundColor: "#069",
  },
  btnTextoSalvar: {
    color: "white",
    fontSize: 18,
    position: "relative",
    textAlign: "center",
    top: 12,
  },
  textAnotacaoEdit: {
    padding: 20,
    backgroundColor: "#fccc",
    height: "50%",
  },
});
