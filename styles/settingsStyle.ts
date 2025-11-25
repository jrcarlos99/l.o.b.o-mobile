import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CBCBCB",
  },
  userInfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C2020",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C2020",
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#CACACA",
    marginRight: 8,
    borderRadius: 4,
  },
  checked: {
    backgroundColor: "#6C2020",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#CACACA",
    marginRight: 8,
    borderRadius: 10,
  },
  radioSelected: {
    backgroundColor: "#6C2020",
  },
  themeContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
});
