import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "../styles/settingsStyle";

const AccountScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Informações da Conta</Text>
      <Text>Nome: Juliana Silveira</Text>
      <Text>Email: juliana.silveira@exemplo.com</Text>
      <Text>Telefone: (11) 99999-9999</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Preferências</Text>
      <Text>Idioma: Português (Brasil)</Text>
      <Text>Fuso horário: America/Sao_Paulo</Text>
    </View>
  </ScrollView>
);

export default AccountScreen;
