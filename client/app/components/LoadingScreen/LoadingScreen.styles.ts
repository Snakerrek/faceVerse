import { StyleSheet } from "react-native";
import { colors } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  activityIndicator: {
    color: colors.blue,
  },
});

export default styles;
