import {StyleSheet} from 'react-native';
import colors from '@/style/colors';

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
    marginTop: 30,
    gap: 10,
  },
  textInput: {
    // marginBottom: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
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
  signinButton: {
    marginTop: 20,
    marginBottom: 5,
  },
});

export default styles;
