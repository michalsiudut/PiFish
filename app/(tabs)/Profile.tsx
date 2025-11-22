import { DEGREES_DATA } from '@/constants/degrees'
import { icons as images } from "@/constants/icons"
import { auth } from '@/services/FirebaseConfig'
import { supabase } from '@/services/supabase'
import { updateUserSingleData } from '@/services/user_services/updateUserSingleData'
import * as ImagePicker from "expo-image-picker"
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DegreeListItem } from '../components/DegreeListItem'
import Loader from '../components/Loader'
import { useUser } from '../context/UserContext'
import { caluclateDegree } from '../hooks/caluclateDegree'

export default function Profile() {

    const router = useRouter();
    const { name, nick, surname, email, xp, profilePhoto, setProfilePhoto } = useUser();

    const [degree, setDegree] = useState("");
    const [nextDegree, setNextDegree] = useState("");
    const [maxXP, setMaxXP] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const degreeInfo = caluclateDegree(xp)
        if (degreeInfo) {
            const degreeName = degreeInfo[0];
            const secondName = degreeInfo[1];
            const degreeMax = degreeInfo[2];
            setDegree(degreeName);
            setNextDegree(secondName);
            setMaxXP(degreeMax);
        }
    }, [xp])

    useEffect(() => {
        const x = (xp * 100) / maxXP;
        setPercentage(x);
        setIsLoading(false);
    }, [maxXP])


    const handleOptionsPress = () => {
        router.push("/Screens/Settings")
    }
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
        <SafeAreaView className='flex-1'>
            <View className='flex-1 justify-center items-end mt-2'>
                <TouchableOpacity onPress={() => handleOptionsPress()}>
                    <Image source={images.Settings} style={styles.icons} className='mr-4'></Image>
                </TouchableOpacity>
            </View>
            {isLoading == true ? <Loader zIndex={0}></Loader> : <View></View>}
            <View className='mt-10 justify-center items-center'>
                <View className='relative'>
                    {profilePhoto == "" ? <Image source={images.Default} style={styles.image} className='border-4 rounded-full border-secondary '></Image> : <Image source={{ uri: profilePhoto }} style={styles.image} className='border-4 rounded-full border-secondary '></Image>}
                    <TouchableOpacity onPress={() => handleEditPhotoPress()} className='absolute bottom-0 right-0 bg-white p-2 rounded-full border-4 border-secondary'>
                        <Image source={images.Edit} style={styles.edit} />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex justify-center items-center mt-4'>
                {name == "" ? <Text style={[styles.text, {
                    fontSize: 25
                }]}>Imię Nazwisko</Text> : <Text style={[styles.text, {
                    fontSize: 25
                }]}>{name} {surname}</Text>}
            </View>
            <View className='flex justify-center items-center mt-2'>
                <Text style={[styles.textShadow, { fontSize: 13 }]}>{nick}</Text>
            </View>
            <View className='flex justify-center items-center mt-2'>
                <Text style={[styles.textShadow, { fontSize: 13 }]}>{email}</Text>
            </View>

            <View className='flex-row mt-4 ml-5 justify-between items-center'>
                <Text style={[styles.text, { fontSize: 20 }]}>Postęp</Text>
                <Text style={[styles.text, { color: '#14b8a6' }]} className='mr-4'>{xp} XP</Text>
            </View>
            <View className='flex-row justify-between mr-4 mt-4 items-center'>
                <View className='flex-row ml-4'>
                    <Text style={styles.textShadow}> Poziom: </Text>
                    <Text style={[styles.textShadow, { color: "#14b8a6" }]}> {degree} </Text>
                </View>
                <Text style={styles.textShadow}> {xp}/{maxXP} </Text>
            </View>

            <View className='w-auto bg-slate-300 h-4 ml-5 mt-2 rounded-xl mr-5'>
                <View className='bg-secondary h-4 flex rounded-xl' style={{ width: `${percentage}%` }}></View>
            </View>
            <View className='flex-row ml-5 mt-2 justify-end mr-4'>
                <Text style={styles.textShadow}>Następny poziom: </Text>
                <Text style={[styles.textShadow, { color: '#14b8a6' }]}>{nextDegree}</Text>
            </View>
            <View className='ml-5'>
                <Text style={[styles.text, { fontSize: 20 }]}>Skala poziomów</Text>
            </View>
            <FlatList className="mt-4 ml-5 mr-4" data={DEGREES_DATA} renderItem={({ item }) => (<DegreeListItem item={item} currentXp={xp} />)}>
            </FlatList>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    icons: {
        tintColor: '#111827',
        width: 28,
        height: 28,
    },
    text: {
        fontFamily: "Lexend-Bold",
        fontSize: 25,
    },
    image: {
        width: 120,
        height: 120,
    },
    textShadow: {
        fontFamily: 'Lexend-Regular',
        color: '#61897F',
    },
    edit: {
        tintColor: 'black',
        width: 20,
        height: 20,
    },
})