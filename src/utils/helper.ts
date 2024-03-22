const getCelsius = (
  temp: number,
  typeFrom: 'kelvin' | 'fahrenheit' = 'fahrenheit',
): number => {
  if (typeFrom === 'kelvin') {
    return Math.round(temp - 273.15);
  } else {
    return Math.round((temp - 32) * (5 / 9));
  }
};

const isObjectEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export {getCelsius, isObjectEmpty};
