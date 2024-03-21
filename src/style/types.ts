export type TFontWeight = 'regular' | 'semiBold' | 'bold';
export type TFontSize = number | (12 | 14 | 18 | 24 | 28);

export type TFontFamily =
  | 'Poppins-Bold'
  | 'Poppins-Regular'
  | 'Poppins-SemiBold';

export type TFont = {
  fontSize: TFontSize;
  fontFamily: TFontFamily;
};

export type TFontVariants =
  | 'xlg'
  | 'lg'
  | 'md'
  | 'sm'
  | 'xs'
  | 'header'
  | 'divider';
export type TTextStyles = Record<TFontVariants, TFont>;

export type TColor =
  | 'primary'
  | 'primaryLight'
  | 'secondary'
  | 'light'
  | 'black'
  | 'white'
  | 'red'
  | 'yellow'
  | 'border'
  | 'lightText'
  | 'darkText'
  | 'secondaryText'
  | 'secondaryLightText';

export type TColors = Record<TColor, string>;
