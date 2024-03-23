import {View, Pressable, Image, TouchableOpacity, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from '@/components/Text';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@/style/colors';

import fontStyles from '@/style/fonts';
import {Button} from 'react-native-paper';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';
import {useEffect} from 'react';
import DEVICE from '@/constants/device';
import useSmoothRotation from '@/style/Animations/useSmoothRotation';
import {useDragAndRelease} from '@/style/Animations/useDragAndRelease';
import {useButtonAnimation} from '@/style/Animations/helpersAmin';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useScreenGrid} from '@/constants/useGrid';
import useInsets from '@/constants/useInsets';

const Welcome = ({}) => {
  const all = useInsets();
  const Icon1 = useScreenGrid({x: 1, y: 0}, all.height);
  const {panResponder: panResponder1, pan: pan1} = useDragAndRelease();
  const {panResponder: panResponder2, pan: pan2} = useDragAndRelease();
  const {panResponder: panResponder3, pan: pan3} = useDragAndRelease();
  const {panResponder: panResponder4, pan: pan4} = useDragAndRelease();

  const Icon2 = useScreenGrid({x: 4, y: 1}, all.height);
  const Icon3 = useScreenGrid({x: 2, y: 2}, all.height);
  const Icon4 = useScreenGrid({x: 4, y: 5}, all.height);

  const navigation = useNavigation();
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

  return (
    <LinearGradient
      style={{
        flex: 1,
        paddingTop: 10,
        height: DEVICE.SCREEN_HEIGHT,
      }}
      colors={[colors.secondary, colors.primary]}>
      <SafeAreaView style={{flex: 1}} mode="margin">
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Animated.Image
              {...panResponder1.panHandlers}
              source={require('../../assets/images/cloud-stars-night.png')}
              style={{
                width: 120,
                height: 100,
                position: 'absolute',

                transform: [
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  {
                    translateX: Animated.add(
                      pan1.x,
                      new Animated.Value(Icon1.top),
                    ),
                  },
                  {
                    translateY: Animated.add(
                      pan1.y,
                      new Animated.Value(Icon1.left + 10),
                    ),
                  },
                  {rotate: iconSpin}, // Assuming `spin` is an animated value for rotation
                ],
              }}
            />
            <Animated.Image
              {...panResponder2.panHandlers}
              source={require('../../assets/images/moon-cloud-light.png')}
              style={{
                width: 100,
                height: 130,
                position: 'absolute',

                transform: [
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  {
                    translateX: Animated.add(
                      pan2.x,
                      new Animated.Value(Icon2.top),
                    ),
                  },
                  {
                    translateY: Animated.add(
                      pan2.y,
                      new Animated.Value(Icon2.left),
                    ),
                  },
                  {rotate: iconSpin}, // Assuming `spin` is an animated value for rotation
                ],
              }}
            />
            <Animated.Image
              {...panResponder3.panHandlers}
              source={require('../../assets/images/cloud-sun.png')}
              style={{
                width: 120,
                position: 'absolute',

                height: 100,
                transform: [
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  {
                    translateX: Animated.add(
                      pan3.x,
                      new Animated.Value(Icon3.top),
                    ),
                  },
                  {
                    translateY: Animated.add(
                      pan3.y,
                      new Animated.Value(Icon3.left),
                    ),
                  },
                  {rotate: iconSpin}, // Assuming `spin` is an animated value for rotation
                ],
              }}
            />
            <Animated.Image
              {...panResponder4.panHandlers}
              source={require('../../assets/images/starts-night.png')}
              style={{
                width: 100,
                height: 90,
                position: 'absolute',
                zIndex: 10,
                transform: [
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  {
                    translateX: Animated.add(
                      pan4.x,
                      new Animated.Value(Icon4.top),
                    ),
                  },
                  {
                    translateY: Animated.add(
                      pan4.y,
                      new Animated.Value(Icon4.left),
                    ),
                  },
                  {rotate: iconSpin}, // Assuming `spin` is an animated value for rotation
                ],
              }}
            />
          </View>
          {/* content  */}
          <View
            style={{
              paddingHorizontal: 22,
              marginBottom: 22,
              justifyContent: 'center',
              width: '100%',
            }}>
            <Text fontVariant="lg" color="white" fontSize={40}>
              Let's Get
            </Text>
            <Text fontVariant="lg" color="white" fontSize={36}>
              Started
            </Text>

            <View style={{marginVertical: 22}}>
              <Text
                fontVariant="md"
                color="white"
                style={{
                  marginVertical: 4,
                }}>
                Welcome to Weatherio. Your personal weather app.
              </Text>
            </View>
            <Animated.View
              style={[{width: '100%', height: 60}, animatedStyles]}>
              <Button
                style={[{borderRadius: 8}]}
                contentStyle={{height: 60}}
                mode="contained"
                buttonColor={colors.secondary}
                labelStyle={{
                  color: colors.white,
                  fontSize: fontStyles.md.fontSize,
                  fontWeight: 'bold',
                }}
                onPress={() => navigation.navigate('Signup')}>
                Join Now
              </Button>
            </Animated.View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
                // justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Text
                    fontVariant="md"
                    color="white"
                    style={{
                      marginRight: 4,
                      marginTop: 3,
                    }}>
                    Already have an account?
                  </Text>
                  <Animated.View style={[{transform: [{rotate: textSpin}]}]}>
                    <TextGradient
                      style={{
                        color: colors.white,
                        fontSize: 30,
                        fontFamily: 'Poppins-Bold',
                      }}
                      locations={[1, 1]}
                      end={{x: 1, y: 0.5}}
                      key={'login'}
                      colors={[colors.yellow, colors.secondary]}
                      text="Login!"
                    />
                  </Animated.View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Welcome;
