import { StyleSheet } from 'react-native';
import { colors, borderRadiuses } from '../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexBasis: '30%',
    margin: '12px',
    alignItems: 'center',
    padding: 15,
    minWidth: '250px',
    minHeight: '200px',
    borderRadius: borderRadiuses.small,
    overflow: 'hidden'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  textContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '8px',
    borderRadius: borderRadiuses.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginTop: '8px'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryText,
    textAlign: 'center',
  },
});