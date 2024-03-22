import {Image, StyleSheet, ImageProps, ViewProps, View} from 'react-native';

interface IProps {
  source?: ImageProps['source'];
  style?: ImageProps['style'];
}

const SquirImg = ({
  source,
  style,
  ...props
}: IProps): React.ReactElement<IProps> => {
  return <Image source={source} style={[styles.image, style]} {...props} />;
};

export default SquirImg;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});
