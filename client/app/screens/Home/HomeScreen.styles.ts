import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Jasnoszare tło Facebooka
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddfe2',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1877f2', // Niebieski Facebooka
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#e4e6eb',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  // --- Tab Bar ---
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddfe2',
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#1877f2',
  },
  
  // --- Feed ---
  feed: {
    flex: 1,
  },

  // --- Create Post ---
  createPostContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 8,
    borderBottomColor: '#f0f2f5',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e4e6eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  postInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 15,
    fontSize: 16,
  },

  // --- Post Card ---
  postCard: {
    backgroundColor: '#ffffff',
    marginVertical: 4, // Cieńszy separator niż w createPost
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderText: {
    marginLeft: 10,
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#050505',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#606770',
  },
  postContent: {
    fontSize: 16,
    color: '#050505',
    marginTop: 10,
    lineHeight: 22,
  },
  postSeparator: {
    height: 1,
    backgroundColor: '#e4e6eb',
    marginVertical: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    color: '#606770',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default styles;

