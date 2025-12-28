import Loader from '@/components/Loader'
import { SettingsAccountManagment } from "@/components/Settings/SettingsAccountManagment"
import { SettingsCheckbox } from '@/components/Settings/SettingsCheckbox'
import SettingsLanguageView from '@/components/Settings/SettingsLanguageView'
import { icons as images } from '@/constants/icons'
import { useUserSettings } from '@/context/UserSettingsContext'
import { auth } from '@/services/FirebaseConfig'
import { updateUserSettings } from '@/services/user_services/updateUserSettings'
import { useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type PartialUserSettings = Partial<{
    all_notifications: boolean;
    dark_mode: boolean;
    language: string;
    lessons_reminder: boolean;
    new_exercises: boolean;
}>;


export default function Settings() {

    const router = useRouter();
    const {
        allNotifications,
        setAllNotifications,
        darkMode,
        setDarkMode,
        language,
        setLanguage,
        lessonsReminder,
        setLessonsReminder,
        newExercises,
        setNewExercises,
        ready: settingsReady
    } = useUserSettings();

    const [localNotifications, setLocalNotifications] = useState(allNotifications);
    const [localReminders, setLocalReminders] = useState(lessonsReminder);
    const [localTasks, setLocalTasks] = useState(newExercises);
    const [localLanguage, setLocalLanguage] = useState(language);
    const [localDarkMode, setLocalDarkMode] = useState(darkMode);
    const [isLoading, setIsLoading] = useState(false);


    const handleSaveSettings = async (partialData?: PartialUserSettings) => {
        setIsLoading(true);
        try {
            const updatedData = {
                all_notifications: localNotifications,
                dark_mode: localDarkMode,
                language: localLanguage,
                lessons_reminder: localReminders,
                new_exercises: localTasks,
                ...partialData,
            };

            await updateUserSettings(updatedData);

            // context
            if (updatedData.all_notifications !== undefined) setAllNotifications(updatedData.all_notifications);
            if (updatedData.dark_mode !== undefined) setDarkMode(updatedData.dark_mode);
            if (updatedData.language !== undefined) setLanguage(updatedData.language);
            if (updatedData.lessons_reminder !== undefined) setLessonsReminder(updatedData.lessons_reminder);
            if (updatedData.new_exercises !== undefined) setNewExercises(updatedData.new_exercises);

            // local
            if (updatedData.all_notifications !== undefined) setLocalNotifications(updatedData.all_notifications);
            if (updatedData.dark_mode !== undefined) setLocalDarkMode(updatedData.dark_mode);
            if (updatedData.language !== undefined) setLocalLanguage(updatedData.language);
            if (updatedData.lessons_reminder !== undefined) setLocalReminders(updatedData.lessons_reminder);
            if (updatedData.new_exercises !== undefined) setLocalTasks(updatedData.new_exercises);

        } catch (err) {
            Alert.alert("Błąd", "Nie udało się zapisać ustawień. Spróbuj ponownie.");
            console.error("Błąd przy zapisie ustawień:", err);
        }
        setIsLoading(false);
        Alert.alert("Sukces", "Ustawienia zostały pomyślnie zapisane");
    };

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
        } catch (err) {
            console.log("Cant sign out");
        }
        setIsLoading(false);
    }
    const handleAccountManagment = () => {
        router.push("/(pages)/EditProfile");
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
            <SettingsLanguageView title='Język' text='Wybór języka' value={localLanguage} setValue={(valOrFunc) => {
                const val = typeof valOrFunc === "function" ? valOrFunc(localLanguage) : valOrFunc;
                setLocalLanguage(val);
                handleSaveSettings({ language: val });
            }}></SettingsLanguageView>
            <Text style={styles.mainText} className='ml-4 mr-4 mt-4'>Powiadomienia</Text>
            <SettingsCheckbox text="Wszystkie powiadomienia" iconName='Bell' value={localNotifications} setValue={(val) => {
                setLocalNotifications(val);
                handleSaveSettings({ all_notifications: val });
            }}></SettingsCheckbox>
            <SettingsCheckbox text="Przypomnienia o nauce" iconName='Education' value={localReminders} setValue={(val) => {
                setLocalReminders(val);
                handleSaveSettings({ lessons_reminder: val });
            }}></SettingsCheckbox>
            <SettingsCheckbox text="Nowe zadania" iconName='Notes' value={localTasks} setValue={(val) => {
                setLocalTasks(val);
                handleSaveSettings({ new_exercises: val });
            }}></SettingsCheckbox>
            <Text style={styles.mainText} className='ml-4 mr-4 mt-4'>Wygląd</Text>
            <SettingsCheckbox text='Ciemny motyw' iconName='Moon' value={localDarkMode} setValue={(val) => {
                setLocalDarkMode(val);
                handleSaveSettings({ dark_mode: val });
            }}></SettingsCheckbox>
            <Text style={styles.mainText} className='ml-4 mr-4 mt-4'>Konto</Text>
            <SettingsAccountManagment onPress={handleAccountManagment} text='Zarządzaj kontem' iconName='Acc'></SettingsAccountManagment>
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