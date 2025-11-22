import { icons as images } from '@/constants/icons'
import { goBack } from 'expo-router/build/global-state/routing'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SettingsComponent from '../components/SettingsComponent'

export default function Settings() {
    return (
        <SafeAreaView className='flex-1 bg-[#d9d9d9]'>
            <View className='flex-row justify-between items-center'>
                <TouchableOpacity onPress={goBack}>
                    <Image source={images.Arrow} style={styles.icons} className='ml-4'></Image>
                </TouchableOpacity>
                <Text style={styles.text}>Ustawienia</Text>
                <View className='h-5 w-[40px]'></View>
            </View>
            <View className='rounded-2xl bg-white'>
                <View className='flex ml-4 mt-4'>
                    <Text style={styles.text}>Dane Osobowe</Text>
                </View>
                <View>
                    <SettingsComponent icon="Profile" message='Dane osobowe'></SettingsComponent>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontFamily: "Lexend-Bold",
    },
    icons: {
        tintColor: '#111827',
        width: 35,
        height: 35,
    },
})