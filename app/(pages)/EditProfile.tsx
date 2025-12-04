import { icons as images } from "@/constants/icons"
import { auth } from '@/services/FirebaseConfig'
import { supabase } from '@/services/supabase'
import { fetchUserData } from "@/services/user_services/fetchUserData"
import { updateUserSingleData } from '@/services/user_services/updateUserSingleData'
import * as ImagePicker from "expo-image-picker"
import { useRouter } from 'expo-router'
import { goBack } from "expo-router/build/global-state/routing"
import { useEffect, useState } from 'react'
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import PhoneInput from 'react-native-international-phone-number'
import { SafeAreaView } from 'react-native-safe-area-context'
import EditProfileComponent from "../components/EditProfileComponent"
import { useUser } from '../context/UserContext'

export default function EditProfile() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { name, nick, surname, email, xp, profilePhoto, setProfilePhoto, setPhoneNumber } = useUser();
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(() => {
            fetchUserData().then(result => {
                setProfilePhoto(result?.ProfilePhoto ?? "");
            });
        });

        return unsub;
    }, []);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [inputValue, setInputValue] = useState('');

    function handleInputValue(number: any) {
        setPhoneNumber(number);
        //updateUserSingleData("PhoneNumber", number) // have to got to the logic when button is clicked to save data to not send many calls to db
        setInputValue(number);
    }

    function handleSelectedCountry(country: any) {
        setSelectedCountry(country);
    }

    // to rerender page
    const [localPhoto, setLocalPhoto] = useState("");
    useEffect(() => {
        setLocalPhoto(profilePhoto);
    }, [profilePhoto]);


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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <View className='justify-between items-center flex-row'>
                    <TouchableOpacity onPress={goBack}>
                        <Image style={styles.icons} source={images.Arrow} className="ml-4"></Image>
                    </TouchableOpacity>
                    <Text style={styles.text}>Personal info</Text>
                    <View className="mr-[35px]"></View>
                </View>
                <View className='mt-10 justify-center items-center'>
                    <View className='relative'>
                        {localPhoto == "" ? <Image source={images.Default} style={styles.image} className='border-4 rounded-full border-secondary '></Image> : <Image source={{ uri: localPhoto }} style={styles.image} className='border-4 rounded-full border-secondary '></Image>}
                        <TouchableOpacity onPress={() => handleEditPhotoPress()} className='absolute bottom-0 right-0 bg-white p-2 rounded-full border-4 border-secondary'>
                            <Image source={images.Edit} style={styles.edit} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mt-6"></View>
                <EditProfileComponent title="Imie" placeholderValue="Wprowadź swoje imie" />
                <View className='ml-4 mr-4 mt-4'>
                    <Text style={styles.text2}>Numer Telefonu</Text>
                </View>
                <View className="mt-4 ml-4 mr-4">
                    <PhoneInput
                        className="mr-5"

                        value={inputValue}
                        onChangePhoneNumber={handleInputValue}
                        selectedCountry={selectedCountry}
                        onChangeSelectedCountry={handleSelectedCountry}
                        placeholder="Wpisz swoj numer telefonu"
                        style={styles.shadowText}
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontFamily: "Lexend-Bold",
    },
    text2: {
        fontFamily: "Lexend-Bold",
        fontSize: 20,
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
    shadowText: {
        fontFamily: "Lexend-Bold",
        color: '#61897F',
        textAlign: "right",
    }
})