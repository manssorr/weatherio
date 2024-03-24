import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import useSmoothRotation from '@/style/Animations/useSmoothRotation';
import {useDragAndRelease} from '@/style/Animations/useDragAndRelease';
import {useButtonAnimation} from '@/style/Animations/helpersAmin';
import {useScreenGrid} from '@/constants/useGrid';
import useInsets from '@/constants/useInsets';
import {SomeScreenNavigationProp} from '../../../navigation/types';

const useWelcomeScreen = () => {
  const all = useInsets();
  const {panResponder: panResponder1, pan: pan1} = useDragAndRelease();
  const {panResponder: panResponder2, pan: pan2} = useDragAndRelease();
  const {panResponder: panResponder3, pan: pan3} = useDragAndRelease();
  const {panResponder: panResponder4, pan: pan4} = useDragAndRelease();

  const Icon1 = useScreenGrid({x: 1, y: 0}, all.height);
  const Icon2 = useScreenGrid({x: 4, y: 1}, all.height);
  const Icon3 = useScreenGrid({x: 2, y: 2}, all.height);
  const Icon4 = useScreenGrid({x: 4, y: 5}, all.height);

  const navigation = useNavigation<SomeScreenNavigationProp<'Welcome'>>();
  const iconSpin = useSmoothRotation();
  const textSpin = useSmoothRotation(2, 250);
  const {buttonAnimation, animatedStyles} = useButtonAnimation(
    1000,
    'in',
    'CombinationsOutExp',
  );

  useEffect(() => {
    buttonAnimation.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    buttonAnimation.start();
  }, [buttonAnimation]);

  const icon1 = {
    top: Icon1.top,
    left: Icon1.left,
    panResponder: panResponder1,
    pan: pan1,
    spin: iconSpin,
  };
  const icon2 = {
    top: Icon2.top,
    left: Icon2.left,
    panResponder: panResponder2,
    pan: pan2,
    spin: iconSpin,
  };
  const icon3 = {
    top: Icon3.top,
    left: Icon3.left,
    panResponder: panResponder3,
    pan: pan3,
    spin: iconSpin,
  };
  const icon4 = {
    top: Icon4.top,
    left: Icon4.left,
    panResponder: panResponder4,
    pan: pan4,
    spin: iconSpin,
  };

  return {
    icon1,
    icon2,
    icon3,
    icon4,
    iconSpin,
    textSpin,
    navigation,
    animatedStyles,
  };
};

export default useWelcomeScreen;
