import {StyleSheet, Text, View} from 'react-native';
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
  const all = useInsets();
  const {unitHeight, unitWidth, left, top} = useScreenGrid({x, y}, all.height);
  const iosFixture = all.device.isIOS ? all.top : 0;

  return (
    <View
      key={`${x}-${y}`}
      style={{
        position: 'absolute',
        width: unitWidth,
        height: unitHeight,
        left,
        top: top + iosFixture,
        backgroundColor: colors[y][x],
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
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      {gridMatrix.map((rows, y) =>
        rows.map((x, j) => <PosView key={`${y}-${j}`} x={x} y={y} />),
      )}
    </View>
  );
};

export default GridView;

const styles = StyleSheet.create({});
