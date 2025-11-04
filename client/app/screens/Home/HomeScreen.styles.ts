import { StyleSheet } from "react-native";
import { colors, borderRadiuses } from "../../theme";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.blue,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: colors.iconBackground,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: {
    color: colors.primaryText,
  },
  iconActive: {
    color: colors.blue,
  },
  iconSecondary: {
    color: colors.secondaryText,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 8,
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: colors.blue,
  },

  feed: {
    flex: 1,
  },

  createPostContainer: {
    backgroundColor: colors.white,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadiuses.medium,
    margin: "12px",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iconBackground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarLetter: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.blue,
  },
  postInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    fontSize: 16,
    paddingTop: 8,
    marginLeft: 8,
  },

  postCard: {
    backgroundColor: colors.white,
    margin: 12,
    borderRadius: borderRadiuses.medium,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  postHeaderText: {
    marginLeft: 10,
  },
  postUserName: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primaryText,
  },
  postTimestamp: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  postContent: {
    fontSize: 16,
    color: colors.primaryText,
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  postSeparator: {
    height: 1,
    backgroundColor: colors.iconBackground,
    marginVertical: 10,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 6,
    color: colors.secondaryText,
    fontWeight: "600",
    fontSize: 14,
  },
  postButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  imagePostButton: {
    backgroundColor: colors.blue,
    width: "45%",
    padding: 10,
    margin: 10,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  imageButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: "5px",
  },
  submitPostButton: {
    backgroundColor: colors.blue,
    width: "45%",
    padding: 10,
    margin: 10,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    justifyContent: "center",
  },
  submitPostButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyFeedText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: colors.secondaryText,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginTop: 60,
    marginRight: 15,
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  menuOptionText: {
    fontSize: 16,
    color: colors.primaryText,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 5,
  },
  postInputActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    marginBottom: 5,
  },
  imagePreviewContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    margin: 12,
    borderRadius: borderRadiuses.medium,
    backgroundColor: colors.white,
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  imageClearButton: {
    position: "absolute",
    top: 15,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    padding: 2,
  },
  postImageContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  postImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  likeCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  likeCountText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#65676B",
  },
  modalContent: {
    backgroundColor: "white",
    height: "50%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalCloseButton: {
    padding: 5,
  },
  likerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  likerName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  emptyListText: {
    textAlign: "center",
    padding: 20,
    color: "#65676B",
    fontSize: 16,
  },
  postStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  commentCountContainer: {
    paddingVertical: 5,
  },

  commentCountText: {
    fontSize: 14,
    color: "#65676B",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#F0F2F5",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  commentSendButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default styles;
