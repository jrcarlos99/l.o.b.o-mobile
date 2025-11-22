import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/login");
    }, 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/lobo-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <ActivityIndicator
          size="small"
          color="#FFD7C6"
          style={{ marginTop: 40 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: { width: 220, height: 220 },
});
