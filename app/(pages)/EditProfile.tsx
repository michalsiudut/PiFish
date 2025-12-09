import ButtonFunction from '@/components/buttons/ButtonFunction'
import GenderDropdown from '@/components/GenderDropdown'
import Loader from '@/components/Loader'
import ValueInputProfile from '@/components/ValueInputProfile'
import { icons as images } from "@/constants/icons"
import { auth } from '@/services/FirebaseConfig'
import { supabase } from '@/services/supabase'
import { fetchUserData } from "@/services/user_services/fetchUserData"
import { updateUserData } from '@/services/user_services/updateUserData'
import { updateUserSingleData } from '@/services/user_services/updateUserSingleData'
import * as ImagePicker from "expo-image-picker"
import { goBack } from "expo-router/build/global-state/routing"
import { useEffect, useState } from 'react'
import { Image, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import PhoneInput from 'react-native-international-phone-number'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '../../context/UserContext'

export default function EditProfile() {
    const { name, setName, surname, setSurname, profilePhoto, setProfilePhoto, setPhoneNumber, gender, setGender, country, setCountry } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    //
    const [localCountry, setLocalCountry] = useState(country);
    const [localGender, setLocalGender] = useState<string>(gender);
    const [localName, setLocalName] = useState(name);
    const [localSurname, setLocalSurname] = useState(surname);
    //
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(() => {
            fetchUserData().then(result => {
                setProfilePhoto(result?.ProfilePhoto ?? "");
            });
        });

        return unsub;
    }, []);


    const handleSaveChange = async () => {
        setIsLoading(true);
        if (localGender) {
            setGender(localGender);
            try {
                await updateUserData({ Gender: localGender });
            } catch (err) {
                console.error("Błąd przy aktualizacji płci:", err);
                setIsLoading(false);
            }
        }
        if (localCountry) {
            setCountry(localCountry);
            try {
                await updateUserData({ Country: localCountry })
            } catch (err) {
                console.log("Blad przy aktualziacji kraju", err);
                setIsLoading(false);
            }
        }

        if (localName) {
            setName(localName);
            try {
                await updateUserData({ Name: localName });
            } catch (err) {
                console.log("eError przy name: ", err);
            }
        }
        if (localSurname) {
            setSurname(localSurname);
            try {
                await updateUserData({ Surname: localSurname });
            } catch (err) {
                console.log("eError przy surname: ", err);
            }
        }
        //TODO PHONE NUMBER update
        setIsLoading(false);
        //TODO ALERT SAVE SUCCESSFULL
    }

    function handleInputValue(number: any) {
        setPhoneNumber(number);
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
                {isLoading == true ? <Loader zIndex={30}></Loader> : <View></View>}
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    enableOnAndroid={true}
                    extraScrollHeight={Platform.OS === 'ios' ? 20 : 100}
                    keyboardOpeningTime={80}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='mt-10 justify-center items-center'>
                        <View className='relative'>
                            {localPhoto == "" ? <Image source={images.Default} style={styles.image} className='border-4 rounded-full border-secondary '></Image> : <Image source={{ uri: localPhoto }} style={styles.image} className='border-4 rounded-full border-secondary '></Image>}
                            <TouchableOpacity onPress={() => handleEditPhotoPress()} className='absolute bottom-0 right-0 bg-white p-2 rounded-full border-4 border-secondary'>
                                <Image source={images.Edit} style={styles.edit} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="mt-6"></View>
                    <View>
                        <ValueInputProfile title="Imie" color='#61897F' placeholder="Wprowadz swoje imie" value={localName} onChangeText={setLocalName}></ValueInputProfile>
                    </View>
                    <View>
                        <ValueInputProfile title="Nazwisko" color='#61897F' placeholder="Wprowadz swoje nazwisko" value={localSurname} onChangeText={setLocalSurname}></ValueInputProfile>
                    </View>
                    <GenderDropdown value={localGender} setValue={setLocalGender} />
                    <View className='ml-4 mr-4'>
                        <Text style={styles.text2} className='text-xl'>Numer Telefonu</Text>
                    </View>
                    <View className="mt-2 ml-4 mb-2 mr-4">
                        <PhoneInput
                            className="p-4"
                            value={inputValue}
                            onChangePhoneNumber={handleInputValue}
                            selectedCountry={selectedCountry}
                            onChangeSelectedCountry={handleSelectedCountry}
                            placeholder="Wpisz swoj numer telefonu"
                            style={styles.shadowText}
                        />
                    </View>
                    <View>
                        <ValueInputProfile title="Kraj" color='#61897F' placeholder="Wprowadz swoj kraj" value={localCountry} onChangeText={setLocalCountry}></ValueInputProfile>
                    </View>
                    <ButtonFunction text="Zaaplikuj zmiany" textColor="#111827" onChange={handleSaveChange}></ButtonFunction>
                </KeyboardAwareScrollView>
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
        textAlign: "left",
    }
})