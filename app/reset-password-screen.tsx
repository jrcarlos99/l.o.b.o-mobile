import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "../styles/settingsStyle";

const ResetPasswordScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Redefinir Senha</Text>
      <Text>• Senha atual: ********</Text>
      <Text>• Nova senha: </Text>
      <Text>• Confirmar nova senha: </Text>
    </View>
  </ScrollView>
);

export default ResetPasswordScreen;
