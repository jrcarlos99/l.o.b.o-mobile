import { colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AvatarMenu({ visible, onClose }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    onClose();
    router.replace("/login");
  };

  const handleConfig = () => {
    onClose();
    router.push("/settings");
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.menu}>
          <TouchableOpacity onPress={handleConfig}>
            <Text style={styles.menuItem}>Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.menuItem}>Sair</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  menu: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 12,
    color: colors.primary,
    fontWeight: "600",
  },
});
