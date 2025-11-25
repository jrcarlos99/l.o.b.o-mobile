import { styles } from "@/styles/reportStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  avatarUrl: string;
  title: string;
  formattedDate: string;
  onDatePress: () => void;
  onNotificationsPress: () => void;
};

export default function HeaderSimple({
  avatarUrl,
  title,
  formattedDate,
  onDatePress,
  onNotificationsPress,
}: Props) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Image
          source={require("@/assets/images/lobo-icon.png")}
          style={styles.reactLogo}
        />
        <View style={styles.rightGroup}>
          <Pressable onPress={onNotificationsPress} style={styles.bellIcon}>
            <MaterialIcons
              name="notifications-none"
              size={26}
              color="#6C2020"
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </Pressable>
          <Image source={{ uri: avatarUrl }} style={styles.avatarUser} />
        </View>
      </View>

      <View style={styles.dateRow}>
        <Pressable onPress={onDatePress} style={styles.dateButton}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <MaterialIcons name="calendar-today" size={18} color="#6C2020" />
        </Pressable>
      </View>

      <View style={styles.headerExtras}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}
