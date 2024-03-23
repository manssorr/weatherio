import DEVICE from './device';

type X = 0 | 1 | 2 | 3 | 4 | 5;
type Y = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type TGridX = Record<X, number>;
type TGridY = Record<Y, number>;
export type TGrid = {x: TGridX; y: TGridY};

export const useScreenGrid = (
  point: {x: X; y: Y},
  customHeight: number,
): {
  unitWidth?: number;
  unitHeight?: number;
  top: number;
  left: number;
} => {
  const WIDTH = DEVICE.SCREEN_WIDTH;
  const HEIGHT = customHeight ? customHeight : DEVICE.SCREEN_HEIGHT;

  const HEIGHT_SLICE = HEIGHT / 10;
  const WIDTH_SLICE = WIDTH / 6;
  const grid: TGrid = {
    x: {
      0: 0,
      1: +WIDTH_SLICE.toFixed(0),
      2: +(WIDTH_SLICE * 2).toFixed(0),
      3: +(WIDTH_SLICE * 3).toFixed(0),
      4: +(WIDTH_SLICE * 4).toFixed(0),
      5: +(WIDTH_SLICE * 5).toFixed(0),
    },
    y: {
      0: 0,
      1: +HEIGHT_SLICE.toFixed(0),
      2: +(HEIGHT_SLICE * 2).toFixed(0),
      3: +(HEIGHT_SLICE * 3).toFixed(0),
      4: +(HEIGHT_SLICE * 4).toFixed(0),
      5: +(HEIGHT_SLICE * 5).toFixed(0),
      6: +(HEIGHT_SLICE * 6).toFixed(0),
      7: +(HEIGHT_SLICE * 7).toFixed(0),
      8: +(HEIGHT_SLICE * 8).toFixed(0),
      9: +(HEIGHT_SLICE * 9).toFixed(0),
    },
  };

  const xObj = grid.x;
  const yObj = grid.y;

  return {
    unitWidth: xObj[1],
    unitHeight: yObj[1],
    top: yObj[point.y],
    left: xObj[point.x],
  };
};
