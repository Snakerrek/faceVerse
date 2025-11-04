import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadiuses } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    marginTop: spacing.large,
  },
  list: {
    flex: 1,
  },
  
  profileContent: {
    alignItems: 'center',
    paddingBottom: spacing.medium,
    marginTop: -60, 
    paddingHorizontal: spacing.medium,
  },
  avatarContainer: {
    marginTop: -60, 
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginTop: spacing.medium,
  },

  infoContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    padding: spacing.medium,
    marginTop: spacing.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  infoRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  infoIcon: {
    marginRight: spacing.medium,
  },
  infoText: {
    fontSize: 16,
    color: colors.primaryText,
  },

  actionButtonRow: {
    flexDirection: 'row',
    marginTop: spacing.medium,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 12,
    borderRadius: borderRadiuses.small,
    alignItems: 'center',
    marginHorizontal: spacing.small / 2,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  postsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryText,
    paddingHorizontal: spacing.medium,
    marginTop: spacing.large,
    marginBottom: spacing.small,
  },
});