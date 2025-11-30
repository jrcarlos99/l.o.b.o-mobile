import { MaterialIcons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./style";

type Props = {
  avatarUrl: string;
  formattedDate: string;
  onDatePress: () => void;
  onNotificationsPress: () => void;
  onAvatarPress: () => void;
  onLogoPress: () => void;
};

export default function HeaderBase({
  avatarUrl,
  formattedDate,
  onDatePress,
  onNotificationsPress,
  onAvatarPress,
  onLogoPress,
}: Props) {
  return (
    <>
      <View style={styles.headerRow}>
        <Pressable onPress={onLogoPress}>
          <Image
            source={require("@/assets/images/lobo-icon.png")}
            style={styles.reactLogo}
          />
        </Pressable>

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

          {/* Avatar do usuário  */}
          <Pressable onPress={onAvatarPress}>
            <Image source={{ uri: avatarUrl }} style={styles.avatarUser} />
          </Pressable>
        </View>
      </View>

      <View style={styles.dateRow}>
        <Pressable onPress={onDatePress} style={styles.dateButton}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <MaterialIcons name="calendar-today" size={18} color="#6C2020" />
        </Pressable>
      </View>
    </>
  );
}
