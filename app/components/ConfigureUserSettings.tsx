import { icons as images } from '@/constants/icons'
import { useRouter } from 'expo-router'
import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
    text: string
}

export const ConfigureUserSettings = ({ text }: Props) => {

    const router = useRouter();
    return (
        <View>
            <TouchableOpacity onPress={() => { router.push("/Screens/EditProfile") }}>
                <View className='flex-row mt-3'>
                    <View className='bg-[#e29090] w-4 z-900 ml-4 h-16 rounded-tl-lg rounded-bl-lg'></View>
                    <View className='flex-1 h-16 mr-4 bg-[#f3baba] justify-center rounded-tr-lg rounded-br-lg'>
                        <View className='flex-row justify-between items-center'>
                            <Text style={styles.text} className='ml-4'>{text}</Text>
                            <Image className='mr-3' source={images.Sign}></Image>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Lexend-Bold',
        color: 'primary',
    },

})