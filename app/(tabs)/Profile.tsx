import { DegreeListItem } from "@/app/components/DegreeListItem"
import validateUserData from "@/app/hooks/validateUserData"
import { DEGREES_DATA } from "@/constants/degrees"
import { icons as images } from "@/constants/icons"
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ConfigureUserSettings } from "../components/ConfigureUserSettings"
import Loader from '../components/Loader'
import { useUser } from '../context/UserContext'
import { caluclateDegree } from '../hooks/caluclateDegree'

export default function Profile() {

    const router = useRouter();
    const { name, nick, surname, email, xp, profilePhoto } = useUser();

    const isUserDataValid = validateUserData({
        name,
        nick,
        surname,
        email,
        xp,
        profilePhoto
    });

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
        router.push("/(pages)/Settings")
    }

    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1 justify-center items-end mt-2'>
                <View className="mr-4 w-11 h-8">
                    <TouchableOpacity onPress={handleOptionsPress}>
                        <Image source={images.Settings} style={styles.icons} />
                    </TouchableOpacity>
                    {isUserDataValid == false ? <Image
                        source={images.Info}
                        className="absolute bottom-6 right-0 w-6 h-6 rounded-full"
                        style={{ zIndex: 1, tintColor: "black", backgroundColor: "#EF4545", width: 23, height: 23 }}
                    /> : <View></View>}
                </View>
            </View>
            {isLoading == true ? <Loader zIndex={0}></Loader> : <View></View>}
            <ScrollView>
                <View className='mt-10 justify-center items-center'>
                    <View className='relative'>
                        {profilePhoto == "" ? <Image source={images.Default} style={styles.image} className='border-4 rounded-full border-secondary '></Image> : <Image source={{ uri: profilePhoto }} style={styles.image} className='border-4 rounded-full border-secondary '></Image>}
                    </View>
                </View>
                <View className='flex justify-center items-center mt-4 relative'>
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
                {isUserDataValid == false ? <ConfigureUserSettings text="Dokończ ustawienia konta" /> : <View></View>}

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
                <View className="mt-3">
                    {DEGREES_DATA.map((item) => (
                        <DegreeListItem key={item.id} item={item} currentXp={xp}></DegreeListItem>
                    ))}
                </View>
            </ScrollView>

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