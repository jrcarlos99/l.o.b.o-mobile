import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "../styles/settingsStyle";

const PrivacyScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Privacidade</Text>
      <Text>• Compartilhar dados com parceiros</Text>
      <Text>• Coleta de dados de uso</Text>
      <Text>• Publicidade personalizada</Text>
      <Text>• Histórico de localização</Text>
    </View>
  </ScrollView>
);

export default PrivacyScreen;
