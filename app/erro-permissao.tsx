import { Text, View } from "react-native";

export default function ErroPermissao() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Você não tem permissão para acessar esta área.
      </Text>
    </View>
  );
}
