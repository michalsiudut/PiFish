import Loader from '@/components/Loader'
import { SettingsCheckbox } from '@/components/Settings/SettingsCheckbox'
import SettingsLanguageView from '@/components/Settings/SettingsLanguageView'
import { icons as images } from '@/constants/icons'
import { auth } from '@/services/FirebaseConfig'
import { goBack } from 'expo-router/build/global-state/routing'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {

    const [localNotifications, setLocalNotifications] = useState(false);
    const [localReminders, setLocalReminders] = useState(false);
    const [localTasks, setLocalTasks] = useState(false);
    const [localLanguage, setLocalLanguage] = useState("pl");
    const [isLoading, setIsLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
        } catch (err) {
            console.log("Cant sign out");
        }
        setIsLoading(false);
    }

    return (
        <SafeAreaView className='flex-1 bg-[#d9d9d9]'>
            <View className='flex-row justify-between items-center mb-4'>
                <TouchableOpacity onPress={goBack}>
                    <Image source={images.Arrow} style={styles.icons} className='ml-4'></Image>
                </TouchableOpacity>
                <Text style={styles.text}>Ustawienia</Text>
                <View className='h-5 w-[40px]'></View>
            </View>
            {isLoading == true ? <Loader zIndex={0}></Loader> : <View></View>}
            <SettingsLanguageView title='Język' text='Wybór języka' value={localLanguage} setValue={setLocalLanguage}></SettingsLanguageView>
            <Text style={styles.mainText} className='ml-4 mr-4 mt-4'>Powiadomienia</Text>
            <SettingsCheckbox text="Wszystkie powiadomienia" iconName='Bell' value={localNotifications} setValue={setLocalNotifications}></SettingsCheckbox>
            <SettingsCheckbox text="Przypomnienia o nauce" iconName='Education' value={localReminders} setValue={setLocalReminders}></SettingsCheckbox>
            <SettingsCheckbox text="Nowe zadania" iconName='Notes' value={localTasks} setValue={setLocalTasks}></SettingsCheckbox>
            <Text style={styles.mainText} className='ml-4 mr-4 mt-4'>Wygląd</Text>
            <SettingsCheckbox text='Ciemny motyw' iconName='Moon' value={darkMode} setValue={setDarkMode}></SettingsCheckbox>
            <Text style={styles.mainText} className='ml-4 mr-4 mt-4'>Konto</Text>
            <View className='ml-4 mr-4 bg-redd rounded-xl h-12 mt-5 w-auto justify-center mb-5'>
                <TouchableOpacity onPress={handleSignOut} className='items-center justify-center'>
                    <Text style={{ fontFamily: "Lexend-Bold", color: 'primary' }}>
                        Wyloguj się
                    </Text>
                </TouchableOpacity >
            </View >
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
    mainText: {
        fontFamily: "Lexend-Bold",
        fontSize: 22,
    },
})