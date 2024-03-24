import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import {
  PaperProvider,
  configureFonts,
  DefaultTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import colors from '@/style/colors';
import {Provider} from 'react-redux';
import {persistor, store} from '@/redux/store';
import AppRoute from '@/navigation/MainNavigator';
import Loader from '@/components/Loader';

const fontConfig = {
  fontFamily: 'Poppins-Regular',
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts({config: fontConfig}),
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    onSurfaceVariant: colors.secondaryText, // onSurfaceVariant text inside input field before editing
    background: colors.white,
    primary: colors.primary,
    error: colors.red,
    // inversePrimary: colors.red,
    card: colors.white,
    text: colors.black,
    border: colors.border,
    // notification: colors.red,
    surface: colors.secondaryLightText,
    onSurface: colors.secondaryText,
    tertiary: colors.darkText,
    backdrop: 'rgba(0, 0, 0, 0.3)',
    elevation: {
      level0: 'transparent',
      // Note: Color values with transparency cause RN to transfer shadows to children nodes
      // instead of View component in Surface. Providing solid background fixes the issue.
      // Opaque color values generated with `palette.primary99` used as background
      level1: 'rgb(247, 243, 249)', // palette.primary40, alpha 0.05
      level2: 'rgb(243, 237, 246)', // palette.primary40, alpha 0.08
      level3: 'rgb(238, 232, 244)', // palette.primary40, alpha 0.11
      level4: 'rgb(236, 230, 243)', // palette.primary40, alpha 0.12
      level5: 'rgb(233, 227, 241)', // palette.primary40, alpha 0.14
    },
  },
  roundness: 5,
};

// @ts-ignore
const {LightTheme} = adaptNavigationTheme({reactNavigationLight: theme});

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider theme={LightTheme}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <AppRoute />
          <StatusBar barStyle="default" />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

export default App;
