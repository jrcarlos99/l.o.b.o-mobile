import { StyleSheet } from "react-native";

export const prehospitalarStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E3E2DD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#E5E4E4",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#FE9900",
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FE9900",
  },
  headerPlaceholder: {
    width: 60,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  flex1: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 4,
  },
  checkboxGroup: {
    flexDirection: "column",
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
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#FE9900",
    borderColor: "#FE9900",
  },
  checkboxText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  exportButton: {
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  exportButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
