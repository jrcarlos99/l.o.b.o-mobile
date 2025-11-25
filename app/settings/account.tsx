import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../styles/settingsStyle";

export default function AccountScreen() {
  const [userData, setUserData] = useState({
    nome: "Juliana Silveira",
    email: "juliana.silveira@exemplo.com",
    telefone: "(11) 99999-9999",
    departamento: "Metropolitana - RMR",
  });

  const handleSave = () => {
    Alert.alert("Sucesso", "Dados atualizados com sucesso!");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Conta" }} />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <Text>Nome Completo</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#CBCBCB",
              padding: 8,
              marginVertical: 8,
              borderRadius: 4,
            }}
            value={userData.nome}
            onChangeText={(text) =>
              setUserData((prev) => ({ ...prev, nome: text }))
            }
          />

          <Text>E-mail</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#CBCBCB",
              padding: 8,
              marginVertical: 8,
              borderRadius: 4,
            }}
            value={userData.email}
            onChangeText={(text) =>
              setUserData((prev) => ({ ...prev, email: text }))
            }
            keyboardType="email-address"
          />

          <Text>Telefone</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#CBCBCB",
              padding: 8,
              marginVertical: 8,
              borderRadius: 4,
            }}
            value={userData.telefone}
            onChangeText={(text) =>
              setUserData((prev) => ({ ...prev, telefone: text }))
            }
            keyboardType="phone-pad"
          />

          <Text>Departamento</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#CBCBCB",
              padding: 8,
              marginVertical: 8,
              borderRadius: 4,
            }}
            value={userData.departamento}
            onChangeText={(text) =>
              setUserData((prev) => ({ ...prev, departamento: text }))
            }
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#6C2020",
              padding: 12,
              borderRadius: 4,
              marginTop: 16,
            }}
            onPress={handleSave}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Salvar Alterações
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <Text>Idioma: Português (Brasil)</Text>
          <Text>Fuso horário: America/Sao_Paulo</Text>
          <Text>Formato de data: DD/MM/AAAA</Text>
        </View>
      </ScrollView>
    </>
  );
}
