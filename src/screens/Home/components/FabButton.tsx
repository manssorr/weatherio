import React from 'react';
import {StyleSheet} from 'react-native';
import {AnimatedFAB} from 'react-native-paper';

const FabButton = ({isExtended, onPress, style}: any) => {
  return (
    <AnimatedFAB
      visible={true}
      icon={'plus'}
      label={'Add City'}
      extended={isExtended}
      onPress={onPress}
      animateFrom={'right'}
      // iconMode={'static'}
      style={[styles.fabStyle, style]}
    />
  );
};

export default FabButton;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    // borderWidth: 1,
    // gap: 10,
    position: 'absolute',
  },
});
