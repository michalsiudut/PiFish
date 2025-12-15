import SettingsLanguageView from '@/components/Settings/SettingsLanguageView'
import { icons as images } from '@/constants/icons'
import { goBack } from 'expo-router/build/global-state/routing'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {
    const handlePress = () => {
        console.log("dziala")
    }

    return (
        <SafeAreaView className='flex-1 bg-[#d9d9d9]'>
            <View className='flex-row justify-between items-center mb-8'>
                <TouchableOpacity onPress={goBack}>
                    <Image source={images.Arrow} style={styles.icons} className='ml-4'></Image>
                </TouchableOpacity>
                <Text style={styles.text}>Ustawienia</Text>
                <View className='h-5 w-[40px]'></View>
            </View>
            <SettingsLanguageView title='Język' text='Wybór języka'></SettingsLanguageView>
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