import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Leaderboard() {
    return (
        <SafeAreaView>
            <View className='justify-center items-center'>
                <Text>Leaderboard</Text>
            </View>
        </SafeAreaView>
    )
}