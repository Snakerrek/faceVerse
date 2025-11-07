import { colors } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import styles from "./MenuItem.styles";

interface MenuItemProps {
  icon: "cog" | "account" | "logout";
  label: string;
  onPress: () => void;
  isDangerous?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onPress,
  isDangerous,
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={isDangerous ? colors.danger : colors.primaryText}
      />
      <Text style={[styles.menuItemText, isDangerous && styles.dangerousText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
