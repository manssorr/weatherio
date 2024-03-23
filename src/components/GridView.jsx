//@ts-nocheck
import DEVICE from '@/constants/device';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';
import useInsets from '@/constants/useInsets';
import {useScreenGrid} from '@/constants/useGrid';

type X = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type Y = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
const gridMatrix = [
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
];
const colors = {
  0: {
    0: '#016075',
    1: '#f3535e',
    2: '#ff0870',
    3: '#59035b',
    4: '#f21100',
    5: '#f3bd59',
  },
  1: {
    0: '#f2fa76',
    1: '#e40d89',
    2: '#2f477a',
    3: '#575068',
    4: '#5edcaa',
    5: '#5a3f35',
  },
  2: {
    0: '#64f28c',
    1: '#43cc53',
    2: '#50db4d',
    3: '#5be9fc',
    4: '#97df3f',
    5: '#7b9350',
  },
  3: {
    0: '#abfa87',
    1: '#7a86bd',
    2: '#fa1b9d',
    3: '#1b08a2',
    4: '#82447a',
    5: '#b13f41',
  },
  4: {
    0: '#606658',
    1: '#0307ec',
    2: '#f519b7',
    3: '#38aee4',
    4: '#a657fc',
    5: '#84e627',
  },
  5: {
    0: '#c1fb55',
    1: '#3fd366',
    2: '#12b8e8',
    3: '#b0e6fd',
    4: '#4b3774',
    5: '#1527e0',
  },
  6: {
    0: '#8ab606',
    1: '#54b666',
    2: '#efc6aa',
    3: '#786957',
    4: '#a4e9bf',
    5: '#762045',
  },
  7: {
    0: '#49ae6f',
    1: '#9abe75',
    2: '#c95c0e',
    3: '#a640b5',
    4: '#1d275f',
    5: '#37f765',
  },
  8: {
    0: '#9f83b3',
    1: '#4f19a0',
    2: '#ccd9e9',
    3: '#cd8c81',
    4: '#0b9feb',
    5: '#9c6101',
  },
  9: {
    0: '#2c7603',
    1: '#9e8c7d',
    2: '#f6435d',
    3: '#3bfda4',
    4: '#6ce675',
    5: '#1f176f',
  },
};

const PosView = ({y, x}: {y: Y, x: X}) => {
  const {height} = useInsets();
  const {unitHeight, unitWidth, left, top} = useScreenGrid({x, y}, height);

  return (
    <View
      key={`${x}-${y}`}
      style={{
        position: 'absolute',
        width: unitWidth,
        height: unitHeight,
        left,
        top,
        backgroundColor: colors[y][x],
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          backgroundColor: 'white',
        }}>{`${y}-${x}`}</Text>
    </View>
  );
};

const GridView = () => {
  const insets = useSafeAreaInsets();
  const NaviBarHeight = DEVICE.SCREEN_HEIGHT - DEVICE.WINDOW_HEIGHT;
  const metrics = initialWindowMetrics;
  const headerHeight = useHeaderHeight();
  const all = useInsets();

  const fuc = (
    display: 'M2101K9AG' | 'iPhone 15 Pro' | 'Nokia T20' | 'all' = 'all',
  ) => {
    if (display === DEVICE.MODEL || display === 'all') {
      console.log(`---------`, DEVICE.MODEL, '---------');
      console.log(`all`, JSON.stringify(all, null, 2));

      console.log(`${DEVICE.isIOS ? 'ios' : 'android'} insets: `, insets);
      console.log(
        `${DEVICE.isIOS ? 'ios' : 'android'} metrics: `,
        metrics.insets,
      );

      console.log(
        `${DEVICE.isIOS ? 'ios' : 'android'} NaviBarHeight: `,
        NaviBarHeight,
      );
      console.log(
        `${DEVICE.isIOS ? 'ios' : 'android'} StatusBar: `,
        StatusBar.currentHeight,
      );
      console.log(
        `${DEVICE.isIOS ? 'ios' : 'android'} Screen-wind: `,
        DEVICE.SCREEN_HEIGHT - DEVICE.WINDOW_HEIGHT,
      );
      console.log(
        `${DEVICE.isIOS ? 'ios' : 'android'} headerHeight : `,
        headerHeight,
      );

      console.log(
        `${DEVICE.isIOS ? 'ios' : 'android'} DEVICE: `,
        JSON.stringify(DEVICE, null, 2),
      );
      console.log(`---------`, '', '---------');
      console.log(`---------`, '------', '---------');
    }
  };

  fuc('iPhone 15 Pro');

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderColor: 'red',
      }}>
      {gridMatrix.map((rows, y) => {
        // ignore zeroth row
        return rows.map((x, j) => {
          // ignore zeroth col
          return <PosView key={`${y}-${j}`} x={x} y={y} />;
        });
      })}
    </View>
  );
};

export default GridView;

const styles = StyleSheet.create({});
