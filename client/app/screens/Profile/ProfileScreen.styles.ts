import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerBackground: {
    height: 150,
    backgroundColor: colors.borderLight,
  },
  profileContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  avatarContainer: {
    marginTop: -80,
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: colors.white,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryText,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: 'center',
    marginBottom: 15,
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  postsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    color: colors.primaryText,
    backgroundColor: colors.background,
  },
  list: {
  },
  loader: {
    paddingVertical: 40,
  }
});

export default styles;