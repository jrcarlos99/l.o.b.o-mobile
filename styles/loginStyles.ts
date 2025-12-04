import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

const { height } = Dimensions.get("window");

export const loginStyles = StyleSheet.create({
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
