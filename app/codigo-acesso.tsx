import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../constants/colors";

export default function CodigoAcesso() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Código de Acesso</Text>
        <Text style={styles.subtitle}>
          Digite o código enviado para seu email
        </Text>

        <View style={styles.inputsRow}>
          {code.map((c, i) => (
            <TextInput
              key={i}
              style={styles.codeInput}
              value={c}
              onChangeText={(t) => {
                const copy = [...code];
                copy[i] = t.slice(-1);
                setCode(copy);
              }}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <PrimaryButton
          title="Submeter"
          onPress={() => router.replace("/login")}
          style={{ marginTop: 18 }}
        />

        <Text style={styles.resend}>Não recebeu o código? Reenviar</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { padding: 18 },
  title: { fontSize: 22, fontWeight: "700", color: colors.textDark },
  subtitle: { color: colors.muted, marginTop: 8, marginBottom: 18 },
  inputsRow: { flexDirection: "row", justifyContent: "space-between" },
  codeInput: {
    width: 52,
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  resend: { color: colors.muted, textAlign: "center", marginTop: 12 },
});
