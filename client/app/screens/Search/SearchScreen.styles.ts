import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBarContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  searchBar: {
    height: 40,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.secondaryText,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.danger,
    fontSize: 16,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 8,
  }
});

export default styles;