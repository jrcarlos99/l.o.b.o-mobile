import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../styles/settingsStyle";

export default function PrivacyScreen() {
  const [privacySettings, setPrivacySettings] = useState({
    compartilharDados: false,
    coletaDados: true,
    publicidade: false,
    localizacao: true,
    analytics: true,
  });

  const toggleSwitch = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExportData = () => {
    Alert.alert(
      "Exportar Dados",
      "Um e-mail com seus dados será enviado em breve."
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive" },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Privacidade" }} />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações de Privacidade</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text>Compartilhar dados com parceiros</Text>
            <Switch
              value={privacySettings.compartilharDados}
              onValueChange={() => toggleSwitch("compartilharDados")}
              trackColor={{ false: "#CBCBCB", true: "#6C2020" }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text>Coleta de dados de uso</Text>
            <Switch
              value={privacySettings.coletaDados}
              onValueChange={() => toggleSwitch("coletaDados")}
              trackColor={{ false: "#CBCBCB", true: "#6C2020" }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text>Publicidade personalizada</Text>
            <Switch
              value={privacySettings.publicidade}
              onValueChange={() => toggleSwitch("publicidade")}
              trackColor={{ false: "#CBCBCB", true: "#6C2020" }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text>Histórico de localização</Text>
            <Switch
              value={privacySettings.localizacao}
              onValueChange={() => toggleSwitch("localizacao")}
              trackColor={{ false: "#CBCBCB", true: "#6C2020" }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text>Dados analíticos</Text>
            <Switch
              value={privacySettings.analytics}
              onValueChange={() => toggleSwitch("analytics")}
              trackColor={{ false: "#CBCBCB", true: "#6C2020" }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controle de Dados</Text>

          <TouchableOpacity
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: "#6C2020",
              borderRadius: 4,
              marginVertical: 8,
            }}
            onPress={handleExportData}
          >
            <Text style={{ color: "#6C2020", textAlign: "center" }}>
              Exportar Meus Dados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: "#FF3B30",
              borderRadius: 4,
              marginVertical: 8,
            }}
            onPress={handleDeleteAccount}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Excluir Minha Conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
