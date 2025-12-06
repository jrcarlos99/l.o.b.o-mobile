import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CUSTOM_TAB_BAR_HEIGHT = 75;
const CUSTOM_TAB_BAR_BOTTOM_SPACING = 10;

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => (
        <CustomTabBar {...props} bottomInset={insets.bottom} />
      )}
    >
      {/*  Todas as telas devem existir fisicamente */}
      <Tabs.Screen name="index" options={{ title: "Início" }} />
      <Tabs.Screen name="occurrences" options={{ title: "Ocorrências" }} />
      <Tabs.Screen name="create" options={{ title: "Criar Ocorrência" }} />
      <Tabs.Screen name="reports" options={{ title: "Relatórios" }} />
      <Tabs.Screen name="settings" options={{ title: "Configurações" }} />
    </Tabs>
  );
}

function CustomTabBar({ state, descriptors, navigation, bottomInset }: any) {
  const bottomStyle = bottomInset + CUSTOM_TAB_BAR_BOTTOM_SPACING;

  return (
    <View style={[styles.tabBar, { bottom: bottomStyle }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;
        const color = isFocused ? "#6B1B1B" : "#8A8A8A";

        const { iconLibrary, iconName } = getIconConfig(route.name, isFocused);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <AnimatedTabItem
            key={route.key}
            iconLibrary={iconLibrary}
            iconName={iconName}
            label={label}
            color={color}
            isFocused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

function AnimatedTabItem({
  iconLibrary,
  iconName,
  label,
  color,
  isFocused,
  onPress,
}: {
  iconLibrary: "Ionicons" | "AntDesign";
  iconName: string;
  label: string;
  color: string;
  isFocused: boolean;
  onPress: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isFocused ? 1.25 : 1, { duration: 250 }) }],
  }));

  const IconComponent = iconLibrary === "AntDesign" ? AntDesign : Ionicons;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      style={styles.tabButton}
      activeOpacity={0.8}
    >
      <Animated.View style={animatedStyle}>
        <IconComponent name={iconName} size={26} color={color} />
      </Animated.View>
      {isFocused && <Text style={[styles.label, { color }]}>{label}</Text>}
    </TouchableOpacity>
  );
}

function getIconConfig(
  routeName: string,
  focused: boolean
): { iconLibrary: "Ionicons" | "AntDesign"; iconName: string } {
  switch (routeName) {
    case "index":
      return {
        iconLibrary: "Ionicons",
        iconName: focused ? "home" : "home-outline",
      };
    case "occurrences":
      return { iconLibrary: "AntDesign", iconName: "alert" };
    case "create":
      return {
        iconLibrary: "Ionicons",
        iconName: focused ? "add-circle" : "add-circle-outline",
      };
    case "reports":
      return {
        iconLibrary: "Ionicons",
        iconName: focused ? "document-text" : "document-text-outline",
      };
    case "settings":
      return {
        iconLibrary: "Ionicons",
        iconName: focused ? "settings" : "settings-outline",
      };
    default:
      return { iconLibrary: "Ionicons", iconName: "ellipse" };
  }
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "#FFF",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    height: CUSTOM_TAB_BAR_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 5,
    borderTopWidth: 0,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: "500",
  },
});
