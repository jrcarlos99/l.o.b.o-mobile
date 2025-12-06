import { StyleSheet } from "react-native";

export const occurrenceEditStyles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6C2020",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  empty: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },

  attachmentItem: {
    fontSize: 14,
    marginBottom: 4,
  },

  button: {
    backgroundColor: "#6C2020",
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
