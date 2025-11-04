import { useFonts } from 'expo-font';
import { ActivityIndicator, Image, Text, View } from "react-native";
import { icons as images } from '../../constants/icons';
import { CustomButton } from '../buttons/CustomButton';



export default function Index() {

  const user = "Jakub";
  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Bold': require('../../assets/fonts/Lexend-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <View className="mt-20 ml-4 flex-row items-center justify-between pr-4">
        <Text className="text-4xl text-primary font-bold" style={{ fontFamily: 'Lexend-Bold' }}>Hello, {user}!</Text>
        <View className="justify-center flex-row items-center">
          <Image source={images.Bell} style={{
            width: 30,
            height: 30,
          }}
            className="mr-4">
          </Image>
          <Image source={images.ProfileIcon} style={{
            width: 40,
            height: 40,
          }}>
          </Image>
        </View>
      </View >
      <View className="w-auto h-16 bg-light-400 m-4 rounded-2xl">
        <View className="flex-row ml-3 mr-3 mt-3">
          <CustomButton title="Podstawowy" secondTitle="Rozszerzony" />
        </View>
      </View >
    </>
  );
}
