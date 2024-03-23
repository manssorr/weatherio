import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

interface IDevice {
  MODEL: string;
  Platform: string;
  isIOS: boolean;

  SCREEN_HEIGHT: number;
  SCREEN_WIDTH: number;
  WINDOW_HEIGHT: number;
  WINDOW_WIDTH: number;

  navigationBarHeight: number;
}

const DEVICE: IDevice = {
  SCREEN_HEIGHT: Dimensions.get('screen').height,
  SCREEN_WIDTH: Dimensions.get('screen').width,
  WINDOW_HEIGHT: Dimensions.get('window').height,
  WINDOW_WIDTH: Dimensions.get('window').width,

  navigationBarHeight:
    Dimensions.get('screen').height - Dimensions.get('window').height,
  MODEL: DeviceInfo.getModel(),
  Platform: Platform.OS,
  isIOS: Platform.OS === 'ios',
};

export default DEVICE;
