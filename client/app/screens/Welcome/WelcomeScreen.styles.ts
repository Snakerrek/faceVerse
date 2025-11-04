import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
    color: colors.primaryText,
  },
  buttonContainer: {
    width: "80%",
    marginVertical: spacing.small,
  },
  button: {
    color: colors.blue,
  },
});
