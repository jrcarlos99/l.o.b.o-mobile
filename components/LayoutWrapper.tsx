import { ReactNode } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  header?: ReactNode;

  children: ReactNode;
};

export default function LayoutWrapper({ header, children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor="#E5E4E4" barStyle="dark-content" />

      {/* Header que recebe paddingTop dinâmico  */}
      <View style={[styles.headerWrapper, { paddingTop: insets.top }]}>
        {header}
      </View>

      {/* Conteúdo com padding lateral  */}
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom, marginTop: 0 },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F7F7",
  },
  headerWrapper: {
    backgroundColor: "transparent",
    alignSelf: "stretch",
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    gap: 16,
  },
});
