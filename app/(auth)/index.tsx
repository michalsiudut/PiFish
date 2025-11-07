import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from "../../FirebaseConfig";
import { icons as images } from '../../constants/icons';


import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../FirebaseConfig';
import { ValueInput } from '../components/ValueInput';
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
                <Image source={images.WelcomeIcon} style={{ width: 53, height: 53 }}>
                </Image>
            </View>
            <View className='justify-center items-center mb-4'>
                <Text className='text-4xl' style={styles.text}>Witaj z powrotem!</Text>
            </View>
            <View className='justify-center items-center mb-8'>
                <Text className='text-base font-bold' style={styles.textShadow}>Zaloguj się na swoje konto</Text>
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

            <TouchableOpacity onPress={signIn}>
                <Text className='ml-5'>Zaloguj się</Text>
            </TouchableOpacity>

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