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

export default function ResetPasswordScreen() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);

  const handleResetPassword = () => {
    if (passwords.new !== passwords.confirm) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (passwords.new.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    Alert.alert("Sucesso", "Senha redefinida com sucesso!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <>
      <Stack.Screen options={{ title: "Redefinir Senha" }} />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alterar Senha</Text>

          <Text>Senha Atual</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#CBCBCB",
              padding: 8,
              marginVertical: 8,
              borderRadius: 4,
            }}
            value={passwords.current}
            onChangeText={(text) =>
              setPasswords((prev) => ({ ...prev, current: text }))
            }
            secureTextEntry={!showPasswords}
            placeholder="Digite sua senha atual"
          />

          <Text>Nova Senha</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#CBCBCB",
              padding: 8,
              marginVertical: 8,
              borderRadius: 4,
            }}
            value={passwords.new}
            onChangeText={(text) =>
              setPasswords((prev) => ({ ...prev, new: text }))
            }
            secureTextEntry={!showPasswords}
            placeholder="Digite a nova senha"
          />

          <Text>Confirmar Nova Senha</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#CBCBCB",
              padding: 8,
              marginVertical: 8,
              borderRadius: 4,
            }}
            value={passwords.confirm}
            onChangeText={(text) =>
              setPasswords((prev) => ({ ...prev, confirm: text }))
            }
            secureTextEntry={!showPasswords}
            placeholder="Confirme a nova senha"
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 8,
            }}
            onPress={() => setShowPasswords(!showPasswords)}
          >
            <View style={[styles.checkbox, showPasswords && styles.checked]} />
            <Text style={{ marginLeft: 8 }}>Mostrar senhas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#6C2020",
              padding: 12,
              borderRadius: 4,
              marginTop: 16,
            }}
            onPress={handleResetPassword}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Redefinir Senha
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requisitos de Segurança</Text>
          <Text>• Mínimo de 6 caracteres</Text>
          <Text>• Pelo menos 1 letra maiúscula</Text>
          <Text>• Pelo menos 1 número</Text>
          <Text>• Não use senhas anteriores</Text>
        </View>
      </ScrollView>
    </>
  );
}
