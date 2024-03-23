import {NativeModules} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import DeviceInfo from 'react-native-device-info';

import DEVICE from './device';
const {StatusBarManager} = NativeModules;

type CustomInsets = {
  safeAreaInsets: ReturnType<typeof useSafeAreaInsets>;

  top: number;
  bottom: number;
  right: number;
  left: number;
  // extra
  statusBarHeight: number;
  navigationHeaderHeight: number;
  navigationBarHeight: number;

  // actual
  width: number;
  height: number;
};

/**
 * useInsets hook
 *
 * @returns {CustomInsets} custom insets
 * @description to use it run
 * yarn add react-native-safe-area-context @react-navigation/elements
 *
 */
const useInsets = (): CustomInsets => {
  const safeAreaInsets = useSafeAreaInsets();
  // top
  const statusBarHeight = DEVICE.isIOS ? 20 : StatusBarManager.HEIGHT;
  // const notchHeight = safeAreaInsets.top - statusBarHeight

  const navigationHeaderHeight = useHeaderHeight() - safeAreaInsets.top;

  // bottom
  const androidNavigationBarHeight =
    DEVICE.SCREEN_HEIGHT - DEVICE.WINDOW_HEIGHT;

  const navigationBarHeight = DEVICE.isIOS
    ? safeAreaInsets.bottom
    : androidNavigationBarHeight;

  const top = navigationHeaderHeight + safeAreaInsets.top;
  const bottom = navigationBarHeight;

  return {
    safeAreaInsets,
    top,
    bottom,
    right: safeAreaInsets.right,
    left: safeAreaInsets.left,

    statusBarHeight,
    navigationHeaderHeight,
    navigationBarHeight,

    width: DEVICE.SCREEN_WIDTH - safeAreaInsets.left - safeAreaInsets.right,
    height: DEVICE.SCREEN_HEIGHT - top - bottom,
  };
};

export default useInsets;
