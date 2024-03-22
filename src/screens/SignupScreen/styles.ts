import {StyleSheet} from 'react-native';
import colors from '@/style/colors';
import fontStyles from '@/style/fonts';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 5,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  textInput: {
    marginTop: 30,
    justifyContent: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  loginButton: {
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 20,
  },
  loginButtonContent: {
    height: 60,
  },
  loginButtonLabel: {
    color: colors.white,
    fontSize: fontStyles.md.fontSize,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    minWidth: '10%',
    flexGrow: 1,
  },
  dividerText: {
    marginHorizontal: 10,
  },
  oauthContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: '#E9E9E9',
  },
});

export default styles;
