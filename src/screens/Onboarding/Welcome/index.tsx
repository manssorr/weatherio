import {View, TouchableOpacity, Animated} from 'react-native';
import Text from '@/components/Text';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@/style/colors';

import fontStyles from '@/style/fonts';
import {Button} from 'react-native-paper';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';
import DEVICE from '@/constants/device';
import {SafeAreaView} from 'react-native-safe-area-context';
import useWelcomeScreen from './useWelcomScreen';
import type {IProps} from './types';

const Welcome = ({}: IProps): React.ReactElement<IProps> => {
  const {
    icon1,
    icon2,
    icon3,
    icon4,
    textSpin,
    navigation,
    iconSpin,
    animatedStyles,
  } = useWelcomeScreen();

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
              {...icon1.panResponder.panHandlers}
              source={require('../../../assets/images/cloud-stars-night.png')}
              style={{
                width: 120,
                height: 100,
                position: 'absolute',

                transform: [
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  {
                    translateX: Animated.add(
                      icon1.pan.x,
                      new Animated.Value(icon1.top),
                    ),
                  },
                  {
                    translateY: Animated.add(
                      icon1.pan.y,
                      new Animated.Value(icon1.left + 10),
                    ),
                  },
                  {rotate: iconSpin}, // Assuming `spin` is an animated value for rotation
                ],
              }}
            />
            <Animated.Image
              {...icon2.panResponder.panHandlers}
              source={require('../../../assets/images/moon-cloud-light.png')}
              style={{
                width: 100,
                height: 130,
                position: 'absolute',

                transform: [
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  {
                    translateX: Animated.add(
                      icon2.pan.x,
                      new Animated.Value(icon2.top),
                    ),
                  },
                  {
                    translateY: Animated.add(
                      icon2.pan.y,
                      new Animated.Value(icon2.left),
                    ),
                  },
                  {rotate: iconSpin}, // Assuming `spin` is an animated value for rotation
                ],
              }}
            />
            <Animated.Image
              {...icon3.panResponder.panHandlers}
              source={require('../../../assets/images/cloud-sun.png')}
              style={{
                width: 120,
                position: 'absolute',

                height: 100,
                transform: [
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  {
                    translateX: Animated.add(
                      icon3.pan.x,
                      new Animated.Value(icon3.top),
                    ),
                  },
                  {
                    translateY: Animated.add(
                      icon3.pan.y,
                      new Animated.Value(icon3.left),
                    ),
                  },
                  {rotate: iconSpin}, // Assuming `spin` is an animated value for rotation
                ],
              }}
            />
            <Animated.Image
              {...icon4.panResponder.panHandlers}
              source={require('../../../assets/images/starts-night.png')}
              style={{
                width: 100,
                height: 90,
                position: 'absolute',
                zIndex: 10,
                transform: [
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  {
                    translateX: Animated.add(
                      icon4.pan.x,
                      new Animated.Value(icon4.top),
                    ),
                  },
                  {
                    translateY: Animated.add(
                      icon4.pan.y,
                      new Animated.Value(icon4.left),
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
                  fontFamily: fontStyles.lg.fontFamily,
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
