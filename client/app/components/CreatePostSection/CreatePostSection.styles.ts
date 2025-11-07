import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    padding: spacing.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.medium,
  },
  input: {
    flex: 1,
    marginLeft: spacing.medium,
    backgroundColor: colors.background,
    borderRadius: borderRadiuses.medium,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    fontSize: typography.fontSize.regular,
    color: colors.primaryText,
    maxHeight: 100,
  },
  imagePreviewContainer: {
    marginBottom: spacing.medium,
    borderRadius: borderRadiuses.small,
    overflow: "hidden",
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: 200,
  },
  removeImageButton: {
    position: "absolute",
    top: spacing.small,
    right: spacing.small,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: borderRadiuses.small,
    padding: spacing.xsmall,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  postButton: {
    backgroundColor: colors.blue,
    borderRadius: borderRadiuses.small,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small,
  },
  postButtonDisabled: {
    opacity: 0.6,
  },
  postButtonText: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.regular,
  },
});

export default styles;
