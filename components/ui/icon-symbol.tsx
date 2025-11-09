// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

type IconSymbolName =
  | "house.fill"
  | "bell.fill"
  | "plus.circle.fill"
  | "document.text.fill"
  | "gearshape.fill"
  | "alert.siren.fill";

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: Record<IconSymbolName, MaterialIconName> = {
  "house.fill": "home",
  "bell.fill": "notifications-active",
  "plus.circle.fill": "add-circle",
  "document.text.fill": "description",
  "gearshape.fill": "settings",
  "alert.siren.fill": "report",
};
/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  const iconName = MAPPING[name];
  return (
    <MaterialIcons name={iconName} size={size} color={color} style={style} />
  );
}
