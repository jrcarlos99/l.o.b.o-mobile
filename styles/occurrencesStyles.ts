import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
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
    gap: 12,
  },
});
