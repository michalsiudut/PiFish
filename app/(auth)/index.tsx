import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from "../../FirebaseConfig";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../FirebaseConfig';

export default function index() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('iimie');
    const [surname, setSurname] = useState('nazwisko');
    const [city, setCity] = useState('Krakow');

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
            <Text>login</Text>
            <TextInput
                placeholder='email:'
                className='bg-slate-500'
                value={email}
                onChangeText={setEmail}>
            </TextInput>
            <TextInput
                placeholder='password'
                className='bg-slate-400'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}>
            </TextInput>


            <TouchableOpacity onPress={signIn}>
                <Text className='ml-5'>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={signUp}>
                <Text className='ml-20'>Register</Text>
            </TouchableOpacity>

            <View className='mt-20'></View>
        </SafeAreaView>
    )
}