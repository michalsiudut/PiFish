import validateUserData from "@/app/hooks/validateUserData"
import { icons as images } from "@/constants/icons"
import { auth } from '@/services/FirebaseConfig'
import { supabase } from '@/services/supabase'
import { updateUserSingleData } from '@/services/user_services/updateUserSingleData'
import * as ImagePicker from "expo-image-picker"
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '../context/UserContext'

export default function Leaderboard() {

    const [percentage, setPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { name, nick, surname, email, xp, profilePhoto, setProfilePhoto } = useUser();

    const isUserDataValid = validateUserData({
        name,
        nick,
        surname,
        email,
        xp,
        profilePhoto
    });

    const handleEditPhotoPress = async () => {
        setIsLoading(true);
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Musisz zezwolić na dostęp do galerii");
            setIsLoading(false);
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.6
        })
        if (!result.canceled) {
            const user = auth.currentUser;
            const userUID = user?.uid;
            const imageUri = result.assets[0].uri;

            try {
                const fileName = `profile_${userUID}.jpg`;

                const response = await fetch(imageUri);
                const arrayBuffer = await response.arrayBuffer();
                const blob = new Uint8Array(arrayBuffer);

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('user_photo')
                    .upload(fileName, blob, {
                        cacheControl: '3600',
                        upsert: true,
                    });

                if (uploadError) {
                    console.error("Błąd uploadu:", uploadError);
                    return;
                }

                const publicURL = supabase.storage
                    .from('user_photo')
                    .getPublicUrl(fileName).data.publicUrl;

                console.log("Zdjęcie dostępne pod URL:", publicURL);
                setProfilePhoto(`${publicURL}?t=${Date.now()}`);
                await updateUserSingleData('ProfilePhoto', `${publicURL}?t=${Date.now()}`);
                alert("Ustawiono zdjęcie profilowe pomyślnie!");

            } catch (err) {
                console.error("Błąd podczas uploadu:", err);
                setIsLoading(false);
            }
        }

        setIsLoading(false);

    }


    return (
        <SafeAreaView>
            <View className='justify-between items-center flex-row'>
                <Image style={styles.icons} source={images.Arrow}></Image>
                <Text style={styles.text}>Personal info</Text>
                <View className="mr-[35px]"></View>
            </View>
            <View className='mt-10 justify-center items-center'>
                <View className='relative'>
                    {profilePhoto == "" ? <Image source={images.Default} style={styles.image} className='border-4 rounded-full border-secondary '></Image> : <Image source={{ uri: profilePhoto }} style={styles.image} className='border-4 rounded-full border-secondary '></Image>}
                    <TouchableOpacity onPress={() => handleEditPhotoPress()} className='absolute bottom-0 right-0 bg-white p-2 rounded-full border-4 border-secondary'>
                        <Image source={images.Edit} style={styles.edit} />
                    </TouchableOpacity>
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
    image: {
        width: 120,
        height: 120,
    },
    edit: {
        tintColor: 'black',
        width: 20,
        height: 20,
    },
})