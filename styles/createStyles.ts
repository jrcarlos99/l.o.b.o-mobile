import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  scroll: {
    flex: 1,
  },

  headerContainer: {
    backgroundColor: "#E5E4E4",
    paddingTop: 40,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },

  input: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#fff",
  },
  textArea: {
    minHeight: 120,
  },
  textBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textBoxText: {
    color: "#333",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 8,
    marginTop: 8,
    position: "relative",
  },
  imageThumb: {
    width: "100%",
    height: "100%",
  },
  removeBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#E53935",
    borderRadius: 16,
    padding: 2,
  },

  signatureBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginTop: 8,
  },
  signatureText: {
    fontSize: 16,
    color: "#555",
  },

  pickerText: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
    minWidth: 0,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "#E5E4E4",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },

  backButton: {
    padding: 6,
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6C2020",
  },
});
