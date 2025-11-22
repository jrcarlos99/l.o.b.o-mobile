import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../constants/colors";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>
          Por favor insira o número de e-mail que enviaremos o código.
        </Text>

        <View style={{ marginTop: 18 }}>
          <AuthInput
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <PrimaryButton
          title="Continue"
          onPress={() => router.push("/codigo-acesso")}
          style={{ marginTop: 18 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { padding: 18, marginTop: 18 },
  title: { fontSize: 22, fontWeight: "700", color: colors.textDark },
  subtitle: { color: colors.muted, marginTop: 8 },
});
