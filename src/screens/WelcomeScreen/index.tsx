import {View, Pressable, Image, TouchableOpacity, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from '@/components/Text';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@/style/colors';

import fontStyles from '@/style/fonts';
import {Button} from 'react-native-paper';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';
import {useEffect} from 'react';
import DEVICE, {screenGrid} from '@/constants/device';
import useSmoothRotation from '@/style/Animations/useSmoothRotation';
import {useDragAndRelease} from '@/style/Animations/useDragAndRelease';
import {useButtonAnimation} from '@/style/Animations/helpersAmin';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import GridView from '@/components/GridView';

const Welcome = ({}) => {
  return <GridView />;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const iconSpin = useSmoothRotation();
  const textSpin = useSmoothRotation(2, 250);
  const {panResponder, pan} = useDragAndRelease();
  const {buttonAnimation, animatedStyles} = useButtonAnimation(
    1000,
    'in',
    'CombinationsOutExp',
  );

  console.log(
    '------------------------',
    DEVICE.MODEL,
    '------------------------',
  );
  console.log(`insets`, insets);
  console.log(JSON.stringify(DEVICE, null, 2));
  console.log(JSON.stringify(screenGrid, null, 2));

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
              {...panResponder.panHandlers}
              source={require('../../assets/images/cloud-stars-night.png')}
              style={{
                width: 120,
                height: 100,
                transform: [
                  {translateX: screenGrid().x[1]},
                  {translateY: screenGrid().y[1]},
                  // Assuming you want to start from an initial offset and add the drag displacement to it
                  // {translateX: Animated.add(pan.x, new Animated.Value(40))},
                  // {translateY: Animated.add(pan.y, new Animated.Value(250))},
                  {rotate: iconSpin}, // Assuming `spin` is an animated value for rotation
                ],
              }}
            />

            {/* <Animated.Image
              source={require('../../assets/images/moon-cloud-light.png')}
              style={{
                width: 100,
                height: 130,
                transform: [
                  // {translateX: 110},
                  // {translateY: -150},
                  {rotate: iconSpin},
                ],
              }}
            /> */}
            {/* <Animated.Image
              source={require('../../assets/images/cloud-sun.png')}
              style={{
                width: 120,
                height: 100,
                transform: [
                  // {translateX: 230},
                  // {translateY: -160},
                  {rotate: iconSpin},
                ],
              }}
            /> */}
            {/* <Animated.Image
              source={require('../../assets/images/starts-night.png')}
              style={{
                width: 100,
                height: 90,
                transform: [
                  // {translateX: 230},
                  // {translateY: 300},
                  {rotate: iconSpin},
                ],
              }}
            /> */}
          </View>
          {/* content  */}
          <View
            style={{
              paddingHorizontal: 22,
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
