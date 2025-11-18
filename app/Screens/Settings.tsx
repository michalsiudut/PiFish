import React, { Component } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons as images } from '@/constants/icons'

export default function Settings() {
    return (
        <SafeAreaView>
            <View className='flex-row justify-between items-center'>
                <Image source={images.Arrow} style={styles.icons} className='ml-4'></Image>
                <Text style={styles.text}>Ustawienia</Text>
                <View className='h-5 w-[40px]'></View>
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