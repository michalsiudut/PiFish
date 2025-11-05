import { useFonts } from "expo-font";
import { Image, Text, View } from "react-native";
import { icons as images } from '../../constants/icons';
import { CustomButton } from '../components/buttons/CustomButton';
import { ProgressBar } from "../components/ProgressBar";


export default function Index() {

  const user = "Jakub";
  const percentage = 45
  const value = 144 * (percentage / 100);

  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Bold': require('../../assets/fonts/Lexend-Bold.ttf'),

  });

  return (
    <>
      <View className="mt-20 ml-4 flex-row items-center justify-between pr-4">
        <Text className="text-4xl text-primary font-bold" style={{ fontFamily: 'Lexend-Bold' }}>Cześć, {user}!</Text>
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
      <View className="ml-4 mb-4">
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-2xl">
          Twój kurs
        </Text>

        <View className="justify-between flex-row items-center mr-4">
          <View className="ml-6 mt-6 w-36">
            <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-lg">
              Matematyka
            </Text>
            <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-sm color-[#6B7280]">
              Poziom podstawowy
            </Text>
            <ProgressBar value={value} />
            <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-sm color-[#6B7280] mt-2">
              {percentage}% ukończono
            </Text>
          </View>
          <Image source={images.SigmaIcon} className="mr-4"></Image>
        </View>
      </View>

      <View>
        <Text>
          Działy
        </Text>
      </View>
    </>
  );
}
