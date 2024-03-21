import {View, Pressable, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from '@/components/Text';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@/style/colors';

import fontStyles from '@/style/fonts';
import {Button} from 'react-native-paper';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';

const Welcome = ({}) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[colors.secondary, colors.primary]}>
      <View style={{flex: 1}}>
        <View>
          <Image
            source={require('../assets/images/hero-bg.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 10,
              transform: [
                {translateX: 20},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />

          <Image
            source={require('../assets/images/hero-bg.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: -30,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-5deg'},
              ],
            }}
          />

          <Image
            source={require('../assets/images/hero-bg.png')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 130,
              left: -50,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '15deg'},
              ],
            }}
          />

          <Image
            source={require('../assets/images/hero-bg.png')}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: 'absolute',
              top: 110,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />
        </View>

        {/* content  */}
        <View
          style={{
            paddingHorizontal: 22,
            position: 'absolute',
            top: 400,
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
          <Button
            style={{borderRadius: 8}}
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
                <TextGradient
                  style={{
                    fontWeight: 'bold',
                    fontSize: 24,
                    fontFamily: 'Poppins-SemiBold',
                  }}
                  locations={[1, 1]}
                  end={{x: 1, y: 0.5}}
                  key={'login'}
                  colors={[colors.yellow, colors.secondary]}
                  text="Login!"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
