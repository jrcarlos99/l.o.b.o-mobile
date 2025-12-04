import { useUser } from "@/context/UserContext";
import { loginStyles as styles } from "@/styles/loginStyles";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as yup from "yup";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../constants/colors";
import { getCurrentUser, login } from "../services/auth";

const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha muito curta")
    .required("Senha é obrigatória"),
});

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
      await loginSchema.validate({ email, password });

      setLoading(true);

      const token = await login(email, password);
      console.log("🔑 Token JWT recebido:", token);
      await AsyncStorage.setItem("token", token);

      supabase.auth.setSession({
        access_token: token,
        refresh_token: token,
      });

      const profile = await getCurrentUser(token);

      setUser({
        id: profile.id,
        nome: profile.nome,
        avatar_url: profile.avatar_url,
      });

      router.push("/(tabs)/occurrences");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Email ou senha inválidos.");
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
