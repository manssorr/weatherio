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
  return obj && Object.keys(obj).length === 0;
};

const limitString = (str: string, length: number = 50) => {
  if (!str) {
    return '';
  }
  if (str.length > length) {
    return str.substring(0, length) + '...';
  }
  return str;
};

export {getCelsius, isObjectEmpty, limitString};
