import { StyleSheet } from "react-native";

export const occurrenceCreateStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
  },
  inputError: {
    borderColor: "#d32f2f",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 12,
    marginTop: 6,
  },
  locationButton: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationButtonText: {
    fontSize: 14,
    color: "#333",
  },
  imageButton: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  imageButtonText: {
    fontSize: 14,
    color: "#333",
  },
  signatureButton: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  signatureButtonText: {
    fontSize: 14,
    color: "#333",
  },
  offlineBanner: {
    backgroundColor: "#ffe5e5",
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  offlineBannerText: {
    color: "#6C2020",
    fontSize: 13,
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 32,
  },
  submitButton: {
    backgroundColor: "#6C2020",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#bbb",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
