import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  formattedDate: string;
  onDatePress: () => void;
};

export default function HeaderReports({
  title,
  formattedDate,
  onDatePress,
}: Props) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <Text style={styles.timeText}>8:16</Text>
        <Pressable onPress={onDatePress} style={styles.dateButton}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <MaterialIcons name="calendar-today" size={16} color="#6C2020" />
        </Pressable>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#E5E4E4",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C2020",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: {
    fontSize: 14,
    color: "#6C2020",
    fontWeight: "500",
  },
  titleRow: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6C2020",
  },
});
