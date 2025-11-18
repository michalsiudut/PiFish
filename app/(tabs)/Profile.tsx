import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { icons as images } from "@/constants/icons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { fetchUserSingleData } from '@/services/user_services/fetchUserSingleData'
import { caluclateDegree } from '../hooks/caluclateDegree'
import { DEGREES_DATA } from '@/constants/degrees'
import { DegreeListItem } from '../components/DegreeListItem'

export default function Profile() {

    const router = useRouter();
    const [name, setName] = useState("");
    const [nick, setNick] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [xp, setXp] = useState(0);
    const [degree, setDegree] = useState("");
    const [nextDegree, setNextDegree] = useState("");
    const [maxXP, setMaxXP] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        fetchUserSingleData("Name").then(result => {
            setName(result)
            if ((result == null) || result == "") {
                setName("Imię");
            }
        });
        fetchUserSingleData("Surname").then(result => {
            setSurname(result)
            if ((result == null) || result == "") {
                setSurname("Nazwisko");
            }
        });
        fetchUserSingleData("Nick").then(result => { setNick(result) });
        fetchUserSingleData("Email").then(result => { setEmail(result) });
        fetchUserSingleData("City").then(result => { setCity(result) });
        fetchUserSingleData("xp").then(result => { setXp(result) });
    }, [])

    useEffect(() => {
        const degreeInfo = caluclateDegree(xp)
        if (degreeInfo) {
            const degreeName = degreeInfo[0];
            const secondName = degreeInfo[1];
            const degreeMax = degreeInfo[2];
            setDegree(degreeName);
            setNextDegree(secondName);
            setMaxXP(degreeMax);
            const x = (xp * 100) / maxXP;
            setPercentage(x);
            console.log(x);
            console.log(percentage);
        }
    }, [xp])


    const handleOptionsPress = () => {
        router.push("/Screens/Settings")
    }
    const handleEditPhotoPress = () => {
        // TODO uploading files logic 
    }

    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1 justify-center items-end mt-2'>
                <TouchableOpacity onPress={() => handleOptionsPress()}>
                    <Image source={images.Settings} style={styles.icons} className='mr-4'></Image>
                </TouchableOpacity>
            </View>
            <View className='mt-10 justify-center items-center'>
                <View className='relative'>
                    <Image source={images.Default} style={styles.image} className='border-4 rounded-full border-secondary '></Image>
                    <TouchableOpacity onPress={() => handleEditPhotoPress()} className='absolute bottom-0 right-0 bg-white p-2 rounded-full border-4 border-secondary'>
                        <Image source={images.Edit} style={styles.edit} />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex justify-center items-center mt-4'>
                <Text style={[styles.text, {
                    fontSize: 25
                }]}>{name} {surname}</Text>
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