import {NativeModules} from 'react-native';

import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';

import DEVICE from './device';
const {StatusBarManager} = NativeModules;

type CustomInsets = {
  safeAreaInsets: ReturnType<typeof useSafeAreaInsets>;
  device: typeof DEVICE;
  top: number;
  bottom: number;
  right: number;
  left: number;
  statusBarHeight: number;
  navigationHeaderHeight: number;
  navigationBarHeight: number;
  width: number;
  height: number;
};

const useInsets = (): CustomInsets => {
  const safeAreaInsets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  if (Platform.OS === 'ios') {
    // top
    const statusBarHeight = 20;
    const navigationHeaderHeight = 0;

    // bottom
    const navigationBarHeight = safeAreaInsets.bottom;

    const top = headerHeight ? 0 : safeAreaInsets.top;
    console.log(`Iosheader`, headerHeight);
    console.log(`Toop`, safeAreaInsets.top);

    const topToBeCut = headerHeight ? headerHeight : safeAreaInsets.top;
    return {
      safeAreaInsets,
      device: DEVICE,
      top,
      bottom: navigationBarHeight,
      right: safeAreaInsets.right,
      left: safeAreaInsets.left,
      statusBarHeight,
      navigationHeaderHeight,
      navigationBarHeight,
      width: DEVICE.SCREEN_WIDTH - safeAreaInsets.left - safeAreaInsets.right,
      height: DEVICE.SCREEN_HEIGHT - safeAreaInsets.bottom - topToBeCut,
    };
  } else {
    // top
    const statusBarHeight = StatusBarManager.HEIGHT;
    const navigationHeaderHeight = headerHeight;

    // bottom
    const androidNavigationBarHeight =
      DEVICE.SCREEN_HEIGHT - DEVICE.WINDOW_HEIGHT;

    const top = navigationHeaderHeight + safeAreaInsets.top;
    // console.log(`top`, top);
    const bottom = androidNavigationBarHeight;

    return {
      safeAreaInsets,
      device: DEVICE,
      top,
      bottom,
      right: safeAreaInsets.right,
      left: safeAreaInsets.left,

      statusBarHeight,
      navigationHeaderHeight,
      navigationBarHeight: androidNavigationBarHeight,

      width: DEVICE.SCREEN_WIDTH - safeAreaInsets.left - safeAreaInsets.right,
      height: DEVICE.SCREEN_HEIGHT - top - bottom,
    };
  }
};

export default useInsets;
