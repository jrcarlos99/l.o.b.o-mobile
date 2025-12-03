import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../constants/colors";
import { getCurrentUser, login } from "../services/auth";

const { height } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const token = await login(email, password);
      console.log("🔑 Token JWT recebido:", token);
      await AsyncStorage.setItem("token", token);

      supabase.auth.setSession({
        access_token: token,
        refresh_token: token,
      });

      const profile = await getCurrentUser(token);
      console.log("👤 Dados do usuário:", profile);

      setUser({
        id: profile.id,
        nome: profile.nome,
        avatar_url: profile.avatar_url,
      });

      router.push("/(tabs)/occurrences");
    } catch (error) {
      Alert.alert("Erro", "Email ou senha inválidos.", error as any);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <ImageBackground
        source={require("../assets/images/header.png")}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
        imageStyle={styles.headerImage}
      >
        <View style={styles.headerContent}>
          <Image
            source={require("../assets/images/lobo-icon.png")}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Entre na sua{"\n"}conta</Text>
        </View>
      </ImageBackground>

      {/* CARD */}
      <View style={styles.card}>
        <AuthInput
          label="Email"
          placeholder="fireman@cbpmpe.gov.br"
          value={email}
          onChangeText={setEmail}
        />

        <AuthInput
          label="Senha"
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.rowSpace}>
          <TouchableOpacity
            onPress={() => setRemember(!remember)}
            style={styles.rememberRow}
          >
            <View
              style={[
                styles.checkbox,
                remember && { backgroundColor: colors.primary },
              ]}
            />
            <Text style={styles.remText}>Lembre-se de mim</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/recuperar-senha")}>
            <Text style={styles.forgot}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title={loading ? "Entrando..." : "Entrar"}
          onPress={handleLogin}
          style={{ marginTop: 20 }}
          disabled={loading}
        />

        {loading && (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 10 }} />
        )}

        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>ou entrar com</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.faceBox}>
          <Text style={{ color: colors.primary, fontSize: 32 }}>ID</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Ao se inscrever, você concorda com os{" "}
          <Text style={styles.link}>Termos de Serviço</Text> e o{" "}
          <Text style={styles.link}>Contrato de Processamento de Dados</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.lightBackground },
  header: { height: height * 0.45, justifyContent: "flex-end" },
  headerImage: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: { paddingHorizontal: 24, paddingBottom: 80 },
  logo: { width: 90, height: 90, marginBottom: 8 },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 38,
  },
  card: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.card,
    marginTop: -50,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 7,
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  rememberRow: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#D9D2D2",
    borderRadius: 4,
    marginRight: 8,
  },
  remText: { color: colors.muted },
  forgot: { color: colors.primary, fontWeight: "600" },
  orRow: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#E9E6E6" },
  orText: { marginHorizontal: 8, color: colors.muted },
  faceBox: {
    marginTop: 20,
    alignSelf: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    width: 110,
    alignItems: "center",
  },
  terms: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginTop: 18,
  },
  link: { color: colors.primary, fontWeight: "700" },
});
