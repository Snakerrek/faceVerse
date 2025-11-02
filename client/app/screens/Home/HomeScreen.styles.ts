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
    flex: 1, // This is correct and necessary for the FlatList
  },

  // --- Create Post ---
  createPostContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // Removed the borderBottom, as the 'Opublikuj' button sits below it
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
    marginTop: 8, // Added marginTop to separate posts from each other and the header
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15, // Added padding here
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
    paddingHorizontal: 15, // Added padding
  },
  postSeparator: {
    height: 1,
    backgroundColor: '#e4e6eb',
    marginVertical: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15, // Added padding
    paddingBottom: 10, // Added padding
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

  // --- STYLES ADDED FOR POSTFEED ---

  submitPostButton: {
    backgroundColor: '#1877f2', // Facebook Blue
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 15, // Match createPostContainer padding
    marginBottom: 10,
    marginTop: 5, // Add space from the input
    alignItems: 'center',
    // This button is part of the createPostContainer's "group"
    borderBottomWidth: 8,
    borderBottomColor: '#f0f2f5',
  },
  submitPostButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  emptyFeedText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#606770',
  },
});

export default styles;