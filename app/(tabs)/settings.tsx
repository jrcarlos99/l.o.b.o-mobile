import HeaderWithFilters from "@/components/Header/HeaderWithFilter";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Alert, StyleSheet, Text, View } from "react-native";

const avatarUrl = "https://github.com/jrcarlos99.png";

const handleFilters = () => {
  console.log("Filters button pressed");
  Alert.alert("Filtros exibidos");
};

export default function Index() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#E5E4E4" }}
      headerImage={
        <HeaderWithFilters
          avatarUrl={avatarUrl}
          title="Configurações"
          onFilterPress={handleFilters}
        />
      }
    >
      <View style={styles.contentContainer}>
        <Text>OPÇÃO 1</Text>
        <Text>OPÇÃO 2</Text>
        <Text>OPÇÃO 3</Text>
      </View>
    </ParallaxScrollView>
  );
}

export const styles = StyleSheet.create({
  contentContainer: {
    color: "#dbdbdb",
    alignItems: "center",
  },
});
