import { StyleSheet } from 'react-native';
import { theme } from 'galio-framework';
import colors from './colors';

export default StyleSheet.create({
  shadow: {
    // borderWidth:1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  divider: {
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 8,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  badge: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  topBar: {
    alignItems: 'center',
    borderBottomColor: 'grey',
    paddingHorizontal: theme.SIZES.BASE * 0.5,
  },
  collapseTitle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.primaryLight,
    padding: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  collapseBody: {
    padding: 10,
    borderColor: colors.border,
    backgroundColor: colors.backgroundLight,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 2,
    padding: 8,
    backgroundColor: colors.background,
  },
  listRowBack: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 2,
    alignItems: 'flex-end',
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    margin: 10,
  },
  primaryButton: {
    minHeight: 48,
    maxHeight: 48,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: colors.PRIMARY_P1,
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    maxHeight: 48,
    paddingVertical: 8,
    paddingHorizontal: 32,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: colors.grey23,
  },
  primaryButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    maxHeight: 48,
    paddingVertical: 8,
    paddingHorizontal: 32,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: colors.SECONDARY_S1,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '700',
  },
  headerText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: 'bold',
  },
  inputLabelText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'grey',
    lineHeight: 16,
    letterSpacing: 0,
  },
  inputText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'grey',
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: 'bold',
  },
});
