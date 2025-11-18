import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { icons as images } from '../../constants/icons';
import { mathTopics } from "../../constants/mathTopics";
import { auth } from "../../services/FirebaseConfig";
import { SwitchButtons } from "../components/buttons/SwitchButtons";
import { TouchableText } from "../components/buttons/TouchableText";
import MathTopicItem from '../components/MathTopicItem';
import { ProgressBar } from "../components/ProgressBar";
import { useFontStatus } from "../hooks/useFontStatus";
import getCurrentUserID from "../../services/user_services/getCurrentUserID"
import { fetchCurrentUserNick } from "../../services/user_services/fetchCurrentUserNick"


export default function Index() {

  const userID = getCurrentUserID();
  const [nick, setNick] = useState("");
  useEffect(() => {
    if (userID) {
      fetchCurrentUserNick(userID).then(result => { setNick(result) })
    }
  }, [userID]);
  const percentage = 45
  const value = 144 * (percentage / 100);

  //font
  const { fontsLoaded } = useFontStatus();

  if (!fontsLoaded) {
    return <ActivityIndicator size="small" />;
  }
  // end font

  const handleTopicPress = (id: number) => {
    // TODO go for topic from id
  };

  return (
    <>
      <View className="mt-20 ml-4 flex-row items-center justify-between pr-4">
        <Text className="text-4xl text-primary font-bold" style={{ fontFamily: 'Lexend-Bold' }}>Cześć, nick!</Text>
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
          <TouchableOpacity onPress={() => auth.signOut()}>
            <Text>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View >
      <View className="w-auto h-16 bg-light-400 m-4 rounded-2xl">
        <View className="flex-row ml-3 mr-3 mt-3">
          <SwitchButtons title="Podstawowy" secondTitle="Rozszerzony" />
        </View>
      </View >
      <ScrollView>
        <View className="ml-4 mb-4">
          <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-2xl text-primary">
            Twój kurs
          </Text>

          <View className="justify-between flex-row items-center mr-4">
            <View className="ml-6 mt-6 w-36">
              <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-lg text-primary">
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

        <View className="flex-row items-center justify-between ml-4 mr-4 w-auto">
          <Text className="text-2xl text-primary" style={{ fontFamily: 'Lexend-Bold' }}>
            Działy
          </Text>
          <TouchableText text="Zobacz wszystkie" color="#14b8a6" fontSize={14} />
        </View>
        <View >
          {mathTopics.map((topic) => (
            <MathTopicItem
              key={topic.id}
              title={topic.title}
              iconName={topic.icon}
              onPress={() => handleTopicPress(topic.id)}
            />
          ))}
        </View >
        <View className="mb-4"></View>
      </ScrollView >
    </>
  );
}
