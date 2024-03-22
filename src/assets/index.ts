import type {ImageProps} from 'react-native';

export type TIconsNames =
  | 'calendar'
  | 'clouds'
  | 'location'
  | 'facebook'
  | 'x'
  | 'google'
  | 'email'
  | 'eye'
  | 'eye-off'
  | 'chevron-left'
  | 'lock';

export type ImagesNames =
  | 'hero'
  | 'city-cover'
  | 'starts-night'
  | 'moon-cloud-light'
  | 'cloud-sun'
  | 'cloud-stars-night';
type IImages = Record<ImagesNames, ImageProps['source']>;

interface IAssets {
  icons: Record<TIconsNames, ImageProps['source']>;
  images: IImages;
}
const assets: IAssets = {
  icons: {
    calendar: require('./icons/calendar.png'),
    clouds: require('./icons/clouds.png'),
    location: require('./icons/location.png'),
    facebook: require('./icons/fb.png'),
    x: require('./icons/x.png'),
    google: require('./icons/google.png'),
    email: require('./icons/mail.png'),
    eye: require('./icons/eye.png'),
    lock: require('./icons/lock.png'),
    'eye-off': require('./icons/eye-off.png'),
    'chevron-left': require('./icons/chevron-left.png'),
  },
  images: {
    hero: require('./images/hero-bg.png'),
    'city-cover': require('./images/city-cover.jpg'),
    'starts-night': require('./images/starts-night.png'),
    'moon-cloud-light': require('./images/moon-cloud-light.png'),
    'cloud-sun': require('./images/cloud-sun.png'),
    'cloud-stars-night': require('./images/cloud-stars-night.png'),
  },
};

export default assets;
