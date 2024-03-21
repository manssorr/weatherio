import React from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import {PaperProvider, configureFonts} from 'react-native-paper';
import colors from '@/style/colors';
import {Provider} from 'react-redux';
import {persistor, store} from '@/redux/store';
import AppRoute from '@/navigation/MainNavigator';

const fontConfig = {
  fontFamily: 'Poppins-Regular',
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider
          theme={{
            fonts: configureFonts({config: fontConfig}),
            colors: {
              background: colors.white,
              primary: colors.primary,
              error: colors.red,
              placeholder: colors.secondaryLightText,
              text: colors.darkText,
            },
            roundness: 10,
          }}>
          <AppRoute />
        </PaperProvider>
        <StatusBar barStyle="default" />
      </PersistGate>
    </Provider>
  );
}

export default App;
