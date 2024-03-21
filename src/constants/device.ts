import {Dimensions, Platform} from 'react-native';

interface IDevice {
  Platform: string;
  SCREEN_HEIGHT: number;
  SCREEN_WIDTH: number;
  isIOS: boolean;
  STATUSBAR_HEIGHT: number;
}
const DEVICE: IDevice = {
  Platform: Platform.OS,
  isIOS: Platform.OS === 'ios',
  SCREEN_HEIGHT: Dimensions.get('screen').height,
  SCREEN_WIDTH: Dimensions.get('screen').width,
  STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 20 : 0,
};

export default DEVICE;
