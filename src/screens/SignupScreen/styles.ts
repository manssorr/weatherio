import {StyleSheet} from 'react-native';
import colors from '@/style/colors';
import fontStyles from '@/style/fonts';

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 15,
  },
  hero: {
    margin: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 5,
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
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 15,
    marginTop: 10,
    paddingBottom: 10,
  },

  pressableCheckbox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },

  textInput: {
    marginBottom: 10,
  },
});

export default styles;
