import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { db } from "../../FirebaseConfig";
import { icons as images } from '../../constants/icons';


import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../FirebaseConfig';
import { ValueInput } from '../components/ValueInput';
import { ButtonFunction } from "../components/buttons/ButtonFunction";
import { TouchableText } from '../components/buttons/TouchableText';
import { useFontStatus } from '../hooks/useFontStatus';

export default function index() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('iimie');
    const [surname, setSurname] = useState('nazwisko');
    const [city, setCity] = useState('Krakow');

    //font 
    const isLoaded = useFontStatus();
    if (!isLoaded) {
        return <ActivityIndicator size={'small'} />
    }

    const signIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            if (user) {
                console.log("success");
                router.replace('/(tabs)')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            const uid = user.user.uid;
            if (user) {
                console.log("success");

                await setDoc(doc(db, "users", uid), {
                    name,
                    surname,
                    city,
                    createdAt: new Date(),
                });

                router.replace('/(tabs)');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView>
            <View className='justify-center items-center mt-24 mb-6'>
                <Image source={images.WelcomeIcon} style={{ width: 53, height: 53, tintColor: "#14b8a6" }}>
                </Image>
            </View>
            <View className='justify-center items-center mb-4 w-auto'>
                <Text className='text-4xl' style={styles.text}>Witaj z powrotem</Text>
            </View>
            <View className='justify-center items-center mb-8'>
                <Text className='text-base font-bold' style={styles.textShadow}>Zaloguj sie na swoje konto</Text>
            </View>
            <ValueInput
                title="Email"
                placeholder="Wpisz swój email"
                value={email}
                onChangeText={setEmail}
                color="#61897F"
            />

            <ValueInput
                title="Hasło"
                placeholder="Wpisz swoje hasło"
                value={password}
                onChangeText={setPassword}
                color="#61897F"
                secureTextEntry={true}
            />
            <View className='justify-center items-end mr-4'>
                <TouchableText text='Zapomniałeś hasła?' color='#14b8a6' fontSize={13}></TouchableText>
            </View>
            <View className='ml-4 mr-4 bg-secondary rounded-xl h-12 mt-5 w-auto justify-center'>
                <ButtonFunction text='Zaloguj się' onChange={signIn} textColor='primary' />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Lexend-Bold',
        color: 'primary',
    },
    textShadow: {
        fontFamily: 'Lexend-Bold',
        color: '#61897F',
    }
})