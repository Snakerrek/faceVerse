import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.blue,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: colors.iconBackground,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iconBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blue,
  },
  postInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  postCard: {
    backgroundColor: colors.white,
    marginTop: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  postHeaderText: {
    marginLeft: 10,
  },
  postUserName: {
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    color: colors.secondaryText,
    fontWeight: '600',
    fontSize: 14,
  },

  submitPostButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 5,
    alignItems: 'center',
    borderBottomWidth: 8,
    borderBottomColor: colors.background,
  },
  submitPostButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  emptyFeedText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.secondaryText,
  },
});

export default styles;