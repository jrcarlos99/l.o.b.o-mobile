import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#E5E4E4",
    paddingBottom: 25,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 15,
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  reactLogo: {
    width: 40,
    height: 40,
  },

  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
  },

  bellIcon: {
    marginRight: 12,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },

  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#E53935",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  avatarUser: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  dateRow: {
    marginBottom: 12,
  },

  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E4E4",
    elevation: 2,
  },

  dateText: {
    fontSize: 14,
    color: "#6C2020",
    fontWeight: "500",
  },

  headerExtras: {
    marginTop: 8,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6C2020",
    marginBottom: 12,
  },

  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  filterBox: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    height: 38,
    justifyContent: "center",
  },

  picker: {
    height: 38,
    fontSize: 12,
  },

  filterButton: {
    backgroundColor: "#6C2020",
    borderRadius: 38,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 8,
  },

  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
