import {StyleSheet, View} from 'react-native';
import {type TColor} from '../../../style/types';
import Text from '@/components/Text';
import Button from '@/components/Button';

interface IProps {
  textColor: TColor;
  text: string;
  onBtnPress: () => void;
  btnText: string;
}

const InfoWithBtn = ({
  textColor = 'black',
  text = 'Edit me!',
  btnText = 'Touch me ;)',
  onBtnPress = () => console.log('Hehe xD'),
}: IProps): React.ReactElement<IProps> => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
      }}>
      <Text fontVariant="lg" color={textColor}>
        {text}
      </Text>
      <Button onPress={onBtnPress} title={btnText} />
    </View>
  );
};

export default InfoWithBtn;
