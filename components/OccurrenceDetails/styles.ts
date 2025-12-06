import { StyleSheet } from "react-native";

export const occurrenceDetailsStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },

  header: {
    marginTop: 20,
    backgroundColor: "#6C2020",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  card: {
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#6C2020",
  },

  title: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: { fontSize: 16, marginBottom: 8 },
  location: { fontSize: 14, color: "#555", marginBottom: 4 },
  date: { fontSize: 12, color: "#777", marginBottom: 4 },
  gps: { fontSize: 12, color: "#777", marginBottom: 8 },

  mapButton: {
    marginLeft: 12,
    color: "#6C2020",
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 12 },

  signature: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
  },
  signatureLabel: { fontSize: 12, color: "#666", marginTop: 4 },

  empty: { fontSize: 14, color: "#999", marginBottom: 12 },

  timelineItem: { fontSize: 14, marginBottom: 4 },

  actionsContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 8,
  },
  actionButton: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },

  actionPrimary: {
    backgroundColor: "#6C2020",
  },
  actionPrimaryText: {
    color: "#fff",
  },

  actionSecondary: {
    borderWidth: 1,
    borderColor: "#6C2020",
    backgroundColor: "#fff",
  },
  actionSecondaryText: {
    color: "#6C2020",
  },
});
